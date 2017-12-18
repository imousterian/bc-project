import { Component } from '@angular/core';
import { FileService } from '../../services/file.svc';
import { FolderService } from '../../services/folder.svc';

@Component({
	selector: 'file-list',
	templateUrl: './file-list.html',
})

export class FileListComponent { 
	
	folderName: string = '';

	constructor(
		private fileSvc: FileService,
		private folderSvc: FolderService) {

	}

	createNewFolder() {
		let payload = {
			name: this.folderName
		}
		this.folderSvc.create(payload).then((response) => {
			console.log(response)
		})
		.catch(err => {
			console.log(err)
		})
	}
}


