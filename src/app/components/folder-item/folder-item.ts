import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FolderService } from '../../services/folder.svc';

@Component({
	selector: 'folder-item',
	templateUrl: './folder-item.html',
})

export class FolderItemComponent implements OnChanges { 
  @Input() item;
  isToggled: boolean = false;
  isNewFolderOpen: boolean = false;
  isFolder: boolean = false;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private folderSvc: FolderService) {
  }

  ngOnChanges(changes) {
    if ('item' in changes) {
      this.isFolder = this.item.type === 'FOLDER';
    }
  }
  
  // currently just fetches the data on each toggle event
  // though it shouldn't be; should be gettign data from a cache if it's already been fetched
  toggle() {
    this.isToggled = !this.isToggled;
    this.getFolderItems();
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
		})
	}

  getFolderItems() {
    this.folderSvc.getAllItemsByFolder(this.item._id).then((response) => {
      this.item.folders = response;
    })
  }

  openNewFolderForm() {
    this.isNewFolderOpen = !this.isNewFolderOpen;
  }
}


