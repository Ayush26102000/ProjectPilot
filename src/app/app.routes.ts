import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from '../components/manager-dashboard/manager-dashboard.component';
import { TeamMemberDashboardComponent } from '../components/team-member-dashboard/team-member-dashboard.component';
import { TaskComponent } from '../components/tasks/tasks.component';
import { ProjectsComponent } from '../components/projects/projects.component';

export const routes: Routes = [
    { path: '', redirectTo: '/LogInPage', pathMatch: 'full' }, 
    { path: 'LogInPage', component: LoginComponent }, 
    { path: 'Users', component: UserComponent } ,
    { path: 'AdminDashboard', component: AdminDashboardComponent } ,
    { path: 'ManagerDashboard', component: ManagerDashboardComponent } ,
    { path: 'TeamMemberDashboard', component: TeamMemberDashboardComponent } ,
    { path: 'Tasks', component: TaskComponent } ,
    { path: 'Projects', component: ProjectsComponent } ,

]
