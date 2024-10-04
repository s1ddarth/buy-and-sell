import { Routes } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';

export const routes: Routes = [
  { path: 'listings', component: ListingsPageComponent, pathMatch: 'full' },
];
