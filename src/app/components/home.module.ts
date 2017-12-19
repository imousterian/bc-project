import { NgModule } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HOMEROUTING } from './home.routing';
import { HomeComponent } from './home';
import { FileListComponent } from './file-list/file-list';
import { NewFolderComponent } from './new-folder/new-folder';
import { FolderItemComponent } from './folder-item/folder-item';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HOMEROUTING,
  ],
  declarations: [
    HomeComponent,
    FileListComponent,
    NewFolderComponent,
    FolderItemComponent,
  ],
  exports: [
    HomeComponent
    // component there
  ],
  entryComponents: [
    NewFolderComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class HomeModule {}
