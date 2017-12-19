import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.svc';
import { FolderService } from '../../services/folder.svc';
import { CacheService } from '../../services/cache.svc';

@Component({
	selector: 'file-list',
	templateUrl: './file-list.html',
})

export class FileListComponent implements OnInit{ 

	foldersAtRootArray: any[] = [];

	constructor(
		private cacheSvc: CacheService,
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

	createNewFolder($event) {
		this.folderSvc.create($event)
		.then((response) => {
			return new Promise((resolve, reject) => {
				resolve(response);
			})
		})
		.then((response: any) => {
			// update cache with initial root data.
			// parameters:  id is the folder/file id; array is a holder for folder children
			this.cacheSvc.updateCache(response._id, []);
			this.getRootData();
		})
		.catch(err => {
			// console.log(err)
		})
	}

	getRootData() {
		this.fileSvc.getAllFiles().then((response) => {
			this.foldersAtRootArray = response;
			response.forEach((r) => {
				// update cache with initial root data.
				// parameters: id is the folder/file id; array is a holder for folder children
				this.cacheSvc.updateCache(r._id, []);
			})
		})
		.catch(err => {
			// console.log(err);
		})
	}
}


