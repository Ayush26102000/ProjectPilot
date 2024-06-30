import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from '../components/manager-dashboard/manager-dashboard.component';
import { TeamMemberDashboardComponent } from '../components/team-member-dashboard/team-member-dashboard.component';
import { TaskComponent } from '../components/tasks/tasks.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { authGuard } from '../guards/auth.guard'; // Adjust the path as necessary

export const routes: Routes = [
    { path: '', redirectTo: '/LogInPage', pathMatch: 'full' },
    { path: 'LogInPage', component: LoginComponent },
    { path: 'Users', component: UserComponent, canActivate: [authGuard] },
    { path: 'AdminDashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
    { path: 'ManagerDashboard', component: ManagerDashboardComponent, canActivate: [authGuard] },
    { path: 'TeamMemberDashboard', component: TeamMemberDashboardComponent, canActivate: [authGuard] },
    { path: 'Tasks', component: TaskComponent, canActivate: [authGuard] },
    { path: 'Projects', component: ProjectsComponent, canActivate: [authGuard] },
];
