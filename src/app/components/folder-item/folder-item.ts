import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FolderService } from '../../services/folder.svc';
import { CacheService } from '../../services/cache.svc';

@Component({
	selector: 'folder-item',
	templateUrl: './folder-item.html',
})

export class FolderItemComponent implements OnChanges { 
  @Input() item;
  byteCount: number = 0;
  isToggled: boolean = false;
  isNewFolderOpen: boolean = false;
  isFolder: boolean = false;
  isCached: boolean = false;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private cacheSvc: CacheService,
    private folderSvc: FolderService) {

      // subscribe to a listener on cachingService in order to get a total count of items' size
      this.cacheSvc.retrieveCache().subscribe((cache) => {
        // reset current count
        this.byteCount = 0;
        this.countFolderSize(cache[this.item._id]);
      })
  }

  ngOnChanges(changes) {
    if ('item' in changes) {
      this.isFolder = this.item.type === 'FOLDER';
      //  initialize item folders in case it doesn't exist
      this.item.folders = this.item.folders || [];
      this.item.size = this.item.size || 0;
    }
  }

  // check if data is cached on the page level
  toggle() {
    this.isToggled = !this.isToggled;
    if (!this.isCached) {
      this.getFolderItems();
    }
  }

  // also, just refetches data after each create event, though data could be cached instead.
  createNewFolder($event) {
		this.folderSvc.create($event)
		.then((response) => {
      this.isNewFolderOpen = false;
      this.isToggled = true;
			return new Promise((resolve, reject) => {
				resolve(response);
			})
		})
		.then((response) => {
			this.getFolderItems();
		})
		.catch(err => {
			// console.log(err)
		});
	}

  getFolderItems() {
    this.folderSvc.getAllItemsByFolder(this.item._id).then((response) => {
      this.isCached = true;
      
      this.item.folders = response;

      this.cacheSvc.updateCache(this.item._id, response)
    })
  }

  countFolderSize(folders) {
    if (folders) {
      folders.forEach(folder => {
        if (folder.size) {
          this.byteCount += folder.size;
        }
        if (folder.folders) {
          this.countFolderSize(folder.folders); 
        }
      });  
    }
  }

  openNewFolderForm() {
    this.isNewFolderOpen = !this.isNewFolderOpen;
  }
}


