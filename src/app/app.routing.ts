import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
]

export const routing = RouterModule.forRoot(routes);