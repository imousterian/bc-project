import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FolderService } from '../../services/folder.svc';

@Component({
	selector: 'folder-item',
	templateUrl: './folder-item.html',
})

export class FolderItemComponent { 
  @Input() item;
  toggled: boolean = false;
  foldersArray: any[] = [];

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

	constructor(private folderSvc: FolderService) {
  }
  
  // currently just fetches the data on each toggle event
  // though it shouldn't be; should be gettign data from a cache if it's already been fetched
  toggle() {
    this.toggled = !this.toggled;
    this.getFolderItems();
  }

  getFolderItems() {
    this.folderSvc.getAllItemsByFolder(this.item._id).then((response) => {
      this.foldersArray = response;
    })
  }
}


