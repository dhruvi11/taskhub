export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

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