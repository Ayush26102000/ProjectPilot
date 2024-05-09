// project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Interfaces/Projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = "https://localhost:7192/api/Project/";

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(project: Project): Observable<Project> {
    const url = `${this.apiUrl}/${project.projectId}`;
    return this.http.put<Project>(url, project);
  }

  deleteProject(project: Project): Observable<Project> {
    const url = `${this.apiUrl}/${project.projectId}`;
    return this.http.delete<Project>(url);
  }
}
