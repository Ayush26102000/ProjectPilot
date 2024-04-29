import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { LoginComponent } from '../components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/LogInPage', pathMatch: 'full' }, 
    { path: 'LogInPage', component: LoginComponent }, 
    { path: 'Users', component: UserComponent } 
]
