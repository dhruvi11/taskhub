export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  projectId: string;
  assignedToId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskListResponse {
  success: boolean;
  data: Task[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
