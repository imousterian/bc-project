import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.svc';
import { FolderService } from '../../services/folder.svc';

@Component({
	selector: 'file-list',
	templateUrl: './file-list.html',
})

export class FileListComponent implements OnInit{ 
	
	folderName: string = '';
	foldersAtRootArray: any[] = [];

	constructor(
		private fileSvc: FileService,
		private folderSvc: FolderService) {
	}

	ngOnInit() {
		this.getRootData();
	}

	// a button click to create a new folder.
	// sends a payload with a 'name' parameter
	// for now, triggers getRootData() method and refetches all data
	// TODO: update data in local cache?

	createNewFolder() {
		let payload = {
			name: this.folderName
		}
		this.folderSvc.create(payload)
		.then((response) => {
			// clear the folder name
			this.folderName = null;
			return new Promise((resolve, reject) => {
				resolve(response);
			})
		})
		.then((response) => {
			this.getRootData();
		})
		.catch(err => {
			// console.log(err)
		})
	}

	getRootData() {
		this.fileSvc.getAllFiles().then((response) => {
			this.foldersAtRootArray = response;
		})
		.catch(err => {
			// console.log(err);
		})
	}
}


