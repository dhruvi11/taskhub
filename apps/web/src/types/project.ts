export type ProjectStatus =
  | "ACTIVE"
  | "ARCHIVED";

export type ProjectRole =
  | "OWNER"
  | "MANAGER"
  | "MEMBER";

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status?: ProjectStatus;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;

  owner?: {
    id: string;
    name: string;
    email: string;
  };

  _count?: {
    members?: number;
    tasks?: number;
  };
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}