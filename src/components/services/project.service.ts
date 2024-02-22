import { $apiWithToken } from "@/src/api/api";
import {
  IProjectByIdResponse,
  IProjectResponse,
} from "@/src/interfaces/project.interface";

export const ProjectService = {
  async createProject(name: string, color: string, isFavorited?: boolean) {
    const res = await $apiWithToken.post("project/create", {
      name,
      color,
      isFavorited,
    });
    return res.data;
  },
  async getProjectByUserId() {
    const res = await $apiWithToken.get<IProjectResponse>("project/user/by-id");
    return res.data;
  },
  async getProjectItemByIdProject(projectId: string) {
    const res = await $apiWithToken.get<IProjectByIdResponse>(
      `project/project/by-id/${projectId}`
    );
    return res.data;
  },
  async createTask(
    projectItemId: string,
    name: string,
    description: string,
    priority: string
  ) {
    const res = await $apiWithToken.post(
      `project/create-task/${projectItemId}`,
      {
        name,
        description,
        priority,
      }
    );
    return res.data;
  },
  async createProjectItem(projectId: string, name: string) {
    const res = await $apiWithToken.post(
      `project/create-project/${projectId}`,
      {
        name,
      }
    );
    return res.data;
  },

  async favorite() {
    const res = await $apiWithToken.get<IProjectResponse>("project/favorite");
    return res.data;
  },
  async changeTaskCompleted(taskId: string) {
    const res = await $apiWithToken.put(`project/change/${taskId}`);
    return res.data;
  },
};
