export interface User {
  userId: number;
    username: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    projectId: number | null; // Foreign key (nullable)
    roleId: number; 
  }
