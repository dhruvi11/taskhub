export type ProjectStatus = "ACTIVE" | "ARCHIVED";

export interface ProjectOwner {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner?: ProjectOwner;
}

export interface ProjectPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProjectListData {
  projects: Project[];
  pagination: ProjectPagination;
}

export interface ProjectListResponse {
  success: boolean;
  message: string;
  data: ProjectListData;
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  data: {
    project: Project;
  };
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}
