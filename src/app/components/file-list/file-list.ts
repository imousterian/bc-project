import { Component } from '@angular/core';
import { FileService } from '../../services/file.svc';
import { FolderService } from '../../services/folder.svc';

@Component({
	selector: 'file-list',
	templateUrl: './file-list.html',
})

export class FileListComponent { 
	
	constructor(
		private fileSvc: FileService,
		private folderSvc: FolderService) {

	}

	createNewFolder() {
		this.folderSvc.create((response) => {
			console.log(response);
		})
		.catch(err => {
			console.log(err)
		})
	}
}


