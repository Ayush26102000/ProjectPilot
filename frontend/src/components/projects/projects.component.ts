import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Project } from '../../Interfaces/Projects';
import {  MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ProjectService } from '../../Services/project.service';
import { User } from '../../Interfaces/User';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, CardModule, CommonModule, MessagesModule, TableModule,FormsModule,CheckboxModule ],
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
  searchQuery: string = '';
  showMembers: boolean = false;
  members: User[] = [];
  showMemberSection: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private projectService: ProjectService 
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDetails: [''],
      projectmembers: [[]]
    });

    this.editProjectForm = this.fb.group({
      editProjectName: ['', Validators.required],
      editMembers: [''] ,
      projectmembers: [[]]
    });
  }

  ngOnInit() {
    this.getProjects();
    this.getallteammembers();
  }

  addProject() {
    const projectData: Project = this.projectForm.value as Project;
    //projectData.members = projectData.members ? projectData.members : [];
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

getSelectedMembers(): string[] {
  return this.members.map(member => member.username);
}


filterMembers() {
  this.showMembers = this.searchQuery.length > 0;
}

updateProject() {
    if (this.editingProject) {
        const updatedProjectData: Project = {
          projectName: this.editProjectForm.get('editProjectName')?.value,
          description: this.editProjectForm.get('editProjectDetails')?.value,
          projectId: this.editingProject.projectId,
          startDate: new Date(),
          endDate: null,
          status: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          taskId: 0
        };

       // updatedProjectData.members = updatedProjectData.members ? updatedProjectData.members : [];
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
      editProjectDetails: project.description
    });
  }

  getallteammembers(){
    this.projectService.getallteammembers().subscribe({
        next: (response) => {
            this.members = response;
        },
        error: (error) => {
            console.error(error);
        }
    });
}

  cancelEdit() {
    this.editProjectForm.reset();
    this.editingProject = null;
  }

  
  toggleMemberSection() {
    this.showMemberSection = !this.showMemberSection;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.buttonText = this.showForm ? 'Cancel' : 'Add Project';
  }

  resetForm() {
    this.projectForm.reset();
  }
}