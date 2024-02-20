export interface IProjectResponse {
  projects: IProject[];
  total_projects: number;
}

export interface IProject {
  id: string;
  color: string;
  createdAt: string;
  isFavorited: boolean;
  name: string;
  ownerId: string;
  updatedAt: string;
  ProjectCollaboratorion?: any;
}

export interface IProjectItems {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
  Task: Array<any>;
}

export interface IProjectByIdResponse {
  total_projectItems: number;
  projectItems: IProjectItems[];
  project: IProject;
}
