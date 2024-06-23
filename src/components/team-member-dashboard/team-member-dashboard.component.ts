import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-member-dashboard',
  standalone: true,
  imports: [ButtonModule,RouterModule],
  templateUrl: './team-member-dashboard.component.html',
  styleUrl: './team-member-dashboard.component.css'
})
export class TeamMemberDashboardComponent {

}
