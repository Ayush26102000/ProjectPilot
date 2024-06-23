import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Interfaces/Task'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7192/api/Task'; 

  constructor(private http: HttpClient) { }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Add a new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Delete a task
  deleteTask(task: Task): Observable<void> {
    const url = `${this.apiUrl}/${task.taskID}`;
    return this.http.delete<void>(url);
  }

  // Edit a task
  editTask(task: Task): Observable<void> {
    const url = `${this.apiUrl}/${task.taskID}`;
    return this.http.put<void>(url, task);
  }
}
