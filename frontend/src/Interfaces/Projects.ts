export interface Project {
  projectId: number;
    projectName: string;
    description: string;
    startDate: Date;
    endDate: Date | null; // Nullable
    status: number;
    createdAt: Date;
    updatedAt: Date;
    taskId: number; 
}
