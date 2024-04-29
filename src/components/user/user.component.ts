import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import { User } from '../../Interfaces/User';
import { Message, MessageService } from 'primeng/api';
import {MessagesModule } from 'primeng/messages'
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonModule ,ReactiveFormsModule,InputTextModule,CardModule,CommonModule,MessagesModule,TableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [MessageService, ]
})


export class UserComponent {
  showForm: boolean = false; 
  buttonText: string = 'Add User';
  User: FormGroup;
  messages: Message[] | undefined;
  Users : User [] = [];


  constructor(private fb: FormBuilder,private userService: UserServiceService,private messageService: MessageService) {
    this.User = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      passwordHash: ['', Validators.required],
      role: ['', Validators.required]
    });
  }


  ngOnInit(){
    this.GetUsers();
  }

  addUser() {
    const userData: User = this.User.value as User;

    this.userService.addUser(userData).subscribe({
      next: (response) => {
        if(response){
          this.messageService.add({severity:'success', summary:'User added successfully', detail:''});
          this.resetForm();
        }
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary:'Error while adding User', detail:''});
        this.resetForm();
      }
    });
  }

  GetUsers(){
    this.userService.GetUsers().subscribe({
      next: (response) => {    
        console.log(response);   
        this.Users = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.buttonText = this.showForm ? 'Cancel' : 'Add User';
  }
  
  resetForm() {
    this.User.reset();
  }

}
