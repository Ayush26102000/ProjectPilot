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
  editUserForm: FormGroup; // Add editUserForm
  messages: Message[] | undefined;
  Users : User [] = [];
  editingUser: User | null = null; // Add editingUser variable

  constructor(private fb: FormBuilder,private userService: UserServiceService,private messageService: MessageService) {
    this.User = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      passwordHash: ['', Validators.required],
      role: ['', Validators.required]
    });

       this.editUserForm = this.fb.group({
        editUsername: ['', Validators.required],
        editEmail: ['', Validators.required],
        editPasswordHash: ['', Validators.required],
        editRole: ['', Validators.required]
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

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe({
      next: (response) => {
        if(response){

          this.GetUsers();
          this.messageService.add({severity:'success', summary:'User deleted successfully', detail:''});
        }
        else{
          this.messageService.add({severity:'error', summary:'Error while deleting User', detail:''});
        }
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary:'Error while deleting User', detail:''});
      }
    });
  }
  
  editUser(user: User) {
    this.editingUser = user;
    this.editUserForm.patchValue({
      editUsername: user.username,
      editEmail: user.email,
      editPasswordHash: user.passwordHash,
      editRole: user.role
    });
  }


  updateUser() {
    

    if (this.editUserForm.valid && this.editingUser) {
      const updatedUserData: User = {
        username: this.editingUser.username, 
        ...this.editUserForm.value
      };
      
      console.log("Update user ts : " + updatedUserData)
      this.userService.EditUser(updatedUserData).subscribe({
        next: (response) => {
          if(response){
            this.GetUsers();
            this.messageService.add({severity:'success', summary:'User updated successfully', detail:''});
            this.editUserForm.reset();
            this.editingUser = null;
          }
          else{
            this.messageService.add({severity:'error', summary:'Error while updating User', detail:''});
          }
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error while updating User', detail:''});
        }
      });
    }
  }
  
  cancelEdit() {
    this.editUserForm.reset();
    this.editingUser = null;
  }
  

  toggleForm() {
    this.showForm = !this.showForm;
    this.buttonText = this.showForm ? 'Cancel' : 'Add User';
  }
  
  resetForm() {
    this.User.reset();
  }

}
