import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../Interfaces/Projects';
import {  MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, CardModule, CommonModule, MessagesModule, TableModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [MessageService]
})
export class ProjectsComponent {
  showForm: boolean = false;
  buttonText: string = 'Add Project';
  projectForm: FormGroup;
  editProjectForm: FormGroup;
  projects: Project[] = [];
  editingProject: Project | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private projectService: ProjectService // Change variable name to lowercase
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDetails: ['']
    });

    this.editProjectForm = this.fb.group({
      editProjectName: ['', Validators.required],
      editProjectDetails: ['']
    });
  }

  ngOnInit() {
    this.getProjects();
  }

  addProject() {
    const projectData: Project = this.projectForm.value as Project;
    projectData.members = projectData.members ? projectData.members : [];
    this.projectService.addProject(projectData).subscribe({
        next: () => {
            this.messageService.add({ severity: 'success', summary: 'Project added successfully' });
            this.resetForm();
            this.getProjects();
        },
        error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error while adding Project' });
            this.resetForm();
        }
    });
}

updateProject() {
    if (this.editingProject) {
        const updatedProjectData: Project = {
            projectName: this.editProjectForm.get('editProjectName')?.value,
            projectDetails: this.editProjectForm.get('editProjectDetails')?.value,
            projectId: this.editingProject.projectId,
            members: this.editProjectForm.get('editMembers')?.value ? [this.editProjectForm.get('editMembers')?.value] : []
        };

        updatedProjectData.members = updatedProjectData.members ? updatedProjectData.members : [];
        this.projectService.updateProject(updatedProjectData).subscribe({
            next: () => {
                this.getProjects();
                this.messageService.add({ severity: 'success', summary: 'Project updated successfully' });
                this.editProjectForm.reset();
                this.editingProject = null;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error while updating Project' });
            }
        });
    }
}


  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project).subscribe({
      next: () => {
        this.getProjects();
        this.messageService.add({ severity: 'success', summary: 'Project deleted successfully' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error while deleting Project' });
      }
    });
  }

  editProject(project: Project) {
    this.editingProject = project;
    this.editProjectForm.patchValue({
      editProjectName: project.projectName,
      editProjectDetails: project.projectDetails
    });
  }

  

  cancelEdit() {
    this.editProjectForm.reset();
    this.editingProject = null;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.buttonText = this.showForm ? 'Cancel' : 'Add Project';
  }

  resetForm() {
    this.projectForm.reset();
  }
}