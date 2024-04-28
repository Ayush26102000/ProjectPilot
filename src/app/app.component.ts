import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserComponent } from '../components/user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,UserComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taskmanagement';
}
