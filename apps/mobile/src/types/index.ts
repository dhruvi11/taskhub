export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  ownerName: string;
  membersCount: number;
  tasksCount: number;
  completedTasks: number;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "LOW" | "MEDIUM" | "HIGH";
  projectId: string;
  projectName: string;
  dueDate: string;
  assignee: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
