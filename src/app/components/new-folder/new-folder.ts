import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'new-folder',
	templateUrl: './new-folder.html',
})

export class NewFolderComponent { 
  @Input() parentID;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

	folderName: string = '';

	constructor() {
	}

  // constructs a payload to be sent back to the parent component
  // parent component is responsible for handing API requests
	constructNewFolderPayload() {
		let payload = {
			name: this.folderName,
			parentID: this.parentID,
    }
    this.onSubmit.emit(payload);
    // clear the name from the input
    setTimeout(function() {
      this.folderName = null;
    }, 100);
	}
}


