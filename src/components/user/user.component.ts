import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonModule ,ReactiveFormsModule,InputTextModule,CardModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  User: FormGroup;

  constructor(private fb: FormBuilder) {
    this.User = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      passwordHash: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  addUser() {
    console.log(this.User.value);
  }
}
