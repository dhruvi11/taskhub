import { TaskRepository } from "../repositories/task.repository";
import { UpdateTaskInput } from "../module/task/task.validation";
import { emailService } from "./email.service";
import { taskCompletionEmail } from "../emails/task-completion.email";
import { prisma } from "../config/prisma";

import { notificationService } from "./notification.service";

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async createTask(data: {
    title: string;
    description?: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate?: string;
    projectId: string;
    createdById: string;
    assignedToId?: string;
  }) {
    return this.repository.create({
      ...data,

      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    });
  }

  async listTasks(
    projectId: string,
    options: {
      page: number;
      limit: number;
      search?: string;
      status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
      priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
      assignedToId?: string;
      sortBy?:
        "createdAt" | "updatedAt" | "dueDate" | "title" | "priority" | "status";
      sortOrder?: "asc" | "desc";
    },
  ) {
    const result = await this.repository.findMany(projectId, options);

    const totalPages = Math.ceil(result.total / options.limit);

    return {
      tasks: result.tasks,

      pagination: {
        page: options.page,
        limit: options.limit,
        total: result.total,
        totalPages,

        hasNextPage: options.page < totalPages,

        hasPreviousPage: options.page > 1,
      },
    };
  }

  async getTask(projectId: string, taskId: string) {
    const task = await this.repository.findById(projectId, taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async updateTask(projectId: string, taskId: string, data: UpdateTaskInput) {
    await this.getTask(projectId, taskId);

    const { dueDate, ...taskData } = data;

    return this.repository.update(taskId, {
      ...taskData,

      ...(dueDate !== undefined
        ? {
            dueDate: dueDate ? new Date(dueDate) : null,
          }
        : {}),
    });
  }

  async deleteTask(projectId: string, taskId: string) {
    await this.getTask(projectId, taskId);

    await this.repository.delete(taskId);
  }

  async assignTask(projectId: string, taskId: string, assignedToId: string) {
    const task = await this.getTask(projectId, taskId);

    const updatedTask = await this.repository.update(taskId, {
      assignedToId,
    });

    const deviceTokens: Array<{ token: string }> =
      await prisma.deviceToken.findMany({
        where: {
          userId: assignedToId,
        },

        select: {
          token: true,
        },
      });

    const tokens = deviceTokens.map((item: { token: string }) => item.token);

    if (tokens.length) {
      try {
        const result = await notificationService.sendPushNotification({
          tokens,

          title: "TaskHub",

          body: `You have been assigned: ${task.title}`,

          data: {
            type: "TASK_ASSIGNED",

            taskId: task.id,

            projectId,
          },
        });

        console.log("Task notification:", result);
      } catch (error) {
        console.error("Task notification failed:", error);
      }
    }

    return updatedTask;
  }
  async completeTask(projectId: string, taskId: string) {
    const existingTask = await this.getTask(projectId, taskId);

    const task = await this.repository.update(taskId, {
      status: "COMPLETED",
    });

    if (existingTask.assignedToId) {
      const [user, project] = await Promise.all([
        prisma.user.findUnique({
          where: {
            id: existingTask.assignedToId,
          },
          select: {
            name: true,
            email: true,
          },
        }),

        prisma.project.findUnique({
          where: {
            id: projectId,
          },
          select: {
            name: true,
          },
        }),
      ]);

      if (user && project) {
        const email = taskCompletionEmail({
          name: user.name,
          taskTitle: existingTask.title,
          projectName: project.name,
        });

        await emailService.sendSafeEmail({
          to: user.email,
          subject: email.subject,
          html: email.html,
          text: email.text,
        });
      }
    }

    return task;
  }
}
