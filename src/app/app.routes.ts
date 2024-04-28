import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from '../components/user/user.component';

export const routes: Routes = [
    { path: '',title:"LogIn Page", component: AppComponent },
    { path: 'Users',title:"Users", component: UserComponent },

];
