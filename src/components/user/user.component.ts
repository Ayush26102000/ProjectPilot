import { Component ,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import { User } from '../../Interfaces/User';
import { Role } from '../../Interfaces/Role';
import {  MessageService } from 'primeng/api';
import {MessagesModule } from 'primeng/messages'
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonModule ,ReactiveFormsModule,InputTextModule,CardModule,CommonModule,MessagesModule,TableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [MessageService, ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class UserComponent {
  showForm: boolean = false;
  buttonText: string = 'Add User';
  User: FormGroup;
  editUserForm: FormGroup;
  Users: User[] = [];
  Roles: Role[] = [];
  editingUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private messageService: MessageService
  ) {
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

  ngOnInit() {
    this.getUsers();
    this.getroles();
  }

  addUser() {
    const userData: User = this.User.value as User;
    this.userService.addUser(userData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'User added successfully' });
        this.resetForm();
        this.getUsers();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error while adding User' });
        this.resetForm();
      }
    });
  }

  getUsers() {
    this.userService.GetUsers().subscribe({
      next: (response) => {
        this.Users = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getroles(){
    this.userService.GetRoles().subscribe({
      next: (response) => {
        this.Roles = response;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe({
      next: () => {
        this.getUsers();
        this.messageService.add({ severity: 'success', summary: 'User deleted successfully' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error while deleting User' });
      }
    });
  }

  editUser(user: User) {
    this.editingUser = user;
    this.editUserForm.patchValue({
      editUsername: user.username,
      editEmail: user.email,
      editRole: user.role
    });
  }

  updateUser() {
    if (this.editingUser) {
      const updatedUserData: User = {
        username: this.editUserForm.get('editUsername')?.value,
        email: this.editUserForm.get('editEmail')?.value,
        passwordHash: this.editUserForm.get('editPasswordHash')?.value,
        role: this.editUserForm.get('editRole')?.value,
        user_id: this.editingUser.user_id
      };

      this.userService.EditUser(updatedUserData).subscribe({
        next: () => {
          this.getUsers();
          this.messageService.add({ severity: 'success', summary: 'User updated successfully' });
          this.editUserForm.reset();
          this.editingUser = null;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error while updating User' });
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
