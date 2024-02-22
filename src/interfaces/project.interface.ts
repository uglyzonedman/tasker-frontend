import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

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
  Task: Array<ITaks>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IProjectResponse, Error>>;
}

export interface IProjectByIdResponse {
  total_projectItems: number;
  projectItems: IProjectItems[];
  project: IProject;
}

export interface ITaks {
  createdAt: string;
  deadline: string;
  description: string;
  id: string;
  isCompleted: boolean;
  name: string;
  priority: string;
  updatedAt: string;
}
