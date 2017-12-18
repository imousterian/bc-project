import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { FileListComponent } from './file-list/file-list';

export const HOMESROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'files' },
      { path: 'files', component: FileListComponent }
    ]
  }
]

export const HOMEROUTING: ModuleWithProviders = RouterModule.forChild(HOMESROUTES);