import { Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile Page'
    },
    {
        path: 'items',
        component: ItemsComponent,
        title: 'Items Page'
    }
];