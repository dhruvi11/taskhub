import { Project, Task, User } from "../types";

export const currentUser: User = {
  id: "user-1",
  name: "Dhruvika Chauhan",
  email: "dhruvika@example.com",
};

export const projects: Project[] = [
  {
    id: "project-1",
    name: "TaskHub",
    description: "Full-stack task management application.",
    status: "ACTIVE",
    ownerName: "Dhruvika Chauhan",
    membersCount: 5,
    tasksCount: 48,
    completedTasks: 32,
  },
  {
    id: "project-2",
    name: "Mobile Application",
    description: "TaskHub React Native mobile application.",
    status: "ACTIVE",
    ownerName: "Dhruvika Chauhan",
    membersCount: 4,
    tasksCount: 24,
    completedTasks: 15,
  },
  {
    id: "project-3",
    name: "Website Redesign",
    description: "Modern responsive website redesign.",
    status: "COMPLETED",
    ownerName: "Dhruvika Chauhan",
    membersCount: 3,
    tasksCount: 18,
    completedTasks: 18,
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Implement mobile navigation",
    description: "Create the main Expo Router navigation structure.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    projectId: "project-1",
    projectName: "TaskHub",
    dueDate: "2026-08-28",
    assignee: "Dhruvika Chauhan",
  },
  {
    id: "task-2",
    title: "Create login screen",
    description: "Build the TaskHub mobile login screen.",
    status: "COMPLETED",
    priority: "HIGH",
    projectId: "project-1",
    projectName: "TaskHub",
    dueDate: "2026-08-25",
    assignee: "Dhruvika Chauhan",
  },
  {
    id: "task-3",
    title: "Build project details",
    description: "Create project detail screen and project statistics.",
    status: "TODO",
    priority: "MEDIUM",
    projectId: "project-2",
    projectName: "Mobile Application",
    dueDate: "2026-09-01",
    assignee: "Dhruvika Chauhan",
  },
  {
    id: "task-4",
    title: "API integration",
    description: "Connect mobile app to TaskHub REST API.",
    status: "TODO",
    priority: "HIGH",
    projectId: "project-2",
    projectName: "Mobile Application",
    dueDate: "2026-09-05",
    assignee: "Dhruvika Chauhan",
  },
];