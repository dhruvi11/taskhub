import api from "./api";

import { Project, CreateProjectRequest } from "@/src/types/project";

export interface ProjectListResponse {
  success: boolean;
  data: Project[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getProjects = async (
  page = 1,
  limit = 10,
): Promise<ProjectListResponse> => {
  const response = await api.get<ProjectListResponse>("/projects", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

export const getProject = async (projectId: string): Promise<Project> => {
  const response = await api.get<{
    success: boolean;
    data: Project;
  }>(`/projects/${projectId}`);

  return response.data.data;
};

export const createProject = async (
  data: CreateProjectRequest,
): Promise<Project> => {
  const response = await api.post<{
    success: boolean;
    data: Project;
  }>("/projects", data);

  return response.data.data;
};

export const updateProject = async (
  projectId: string,
  data: Partial<CreateProjectRequest>,
): Promise<Project> => {
  const response = await api.patch<{
    success: boolean;
    data: Project;
  }>(`/projects/${projectId}`, data);

  return response.data.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await api.delete(`/projects/${projectId}`);
};
