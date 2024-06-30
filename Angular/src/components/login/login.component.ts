
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service.service'; 
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {  ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import {MessagesModule } from 'primeng/messages'
import { TableModule } from 'primeng/table';
import { Message, MessageService } from 'primeng/api';
import { User } from '../../Interfaces/User';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ButtonModule ,ReactiveFormsModule,InputTextModule,CardModule,CommonModule,MessagesModule,TableModule],
  providers: [MessageService ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  user:User[] = [];
  ngOnInit(): void {
    
  }

  login() {
    if (this.loginForm.valid) {

      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(username, password).subscribe({
        next: (response: any[]) => {
          if(response != null){
            
            response.forEach(user => {
              sessionStorage.setItem('username', user.username);
              if(user.roleID == 1) {
                this.router.navigate(['/AdminDashboard']);
              } else if(user.roleID == 2) {
                this.router.navigate(['/ManagerDashboard']);
              } else {
                this.router.navigate(['/TeamMemberDashboard']);
              }
            });
          }else{
            this.messageService.add({ severity: 'error', summary: 'OMG ! Check your username password again' });
          }
         
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'OMG ! Check your username password again' });
        }
    });
    }
  }
}
