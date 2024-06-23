// project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Interfaces/Projects';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = "https://localhost:7192/api/Project/";

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getallteammembers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'GetAllTeamMembers');
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + "AddProject", project);
  }

  updateProject(project: Project): Observable<Project> {
   
    return this.http.put<Project>(this.apiUrl + "UpdateProject", project);
  }

  deleteProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + "DeleteProject", project);
  }

  
}
