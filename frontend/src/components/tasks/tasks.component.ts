import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service'; 
import { Task } from '../../Interfaces/Task'; 
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';  

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, CardModule, CommonModule, MessagesModule, TableModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers: [MessageService, ]
})


export class TaskComponent {
  showForm: boolean = false;
  buttonText: string = 'Add Task';
  Task: FormGroup;
  editTaskForm: FormGroup;
  Tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService
  ) {
    this.Task = this.fb.group({
      taskName: ['', Validators.required],
      taskID: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskType: ['', Validators.required],
      status: ['', Validators.required],
      projectName: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required]
    });

    this.editTaskForm = this.fb.group({
      editTaskName: ['', Validators.required],
      editTaskID: ['', Validators.required],
      editTaskDescription: ['', Validators.required],
      editTaskType: ['', Validators.required],
      editStatus: ['', Validators.required],
      editProjectName: ['', Validators.required],
      editStartDate: ['', Validators.required],
      editDueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  addTask() {
    const taskData: Task = this.Task.value as Task;
    this.taskService.addTask(taskData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Task added successfully' });
        this.resetForm();
        this.getTasks();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error while adding Task' });
        this.resetForm();
      }
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.Tasks = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.getTasks();
        this.messageService.add({ severity: 'success', summary: 'Task deleted successfully' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error while deleting Task' });
      }
    });
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.editTaskForm.patchValue({
      editTaskName: task.taskName,
      editTaskID: task.taskID,
      editTaskDescription: task.taskDescription,
      editTaskType: task.taskType,
      editStatus: task.status,
      editProjectName: task.projectName,
      editStartDate: task.startDate,
      editDueDate: task.dueDate
    });
  }

  updateTask() {
    if (this.editingTask) {
      const updatedTaskData: Task = {
        taskName: this.editTaskForm.get('editTaskName')?.value,
        taskID: this.editTaskForm.get('editTaskID')?.value,
        taskDescription: this.editTaskForm.get('editTaskDescription')?.value,
        taskType: this.editTaskForm.get('editTaskType')?.value,
        status: this.editTaskForm.get('editStatus')?.value,
        projectName: this.editTaskForm.get('editProjectName')?.value,
        startDate: this.editTaskForm.get('editStartDate')?.value,
        dueDate: this.editTaskForm.get('editDueDate')?.value,
      };

      this.taskService.editTask(updatedTaskData).subscribe({
        next: () => {
          this.getTasks();
          this.messageService.add({ severity: 'success', summary: 'Task updated successfully' });
          this.editTaskForm.reset();
          this.editingTask = null;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error while updating Task' });
        }
      });
    }
  }

  cancelEdit() {
    this.editTaskForm.reset();
    this.editingTask = null;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.buttonText = this.showForm ? 'Cancel' : 'Add Task';
  }

  resetForm() {
    this.Task.reset();
  }
}