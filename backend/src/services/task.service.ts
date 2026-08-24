import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  constructor(
    private readonly repository: TaskRepository
  ) {}

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

      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : undefined,
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
        | "createdAt"
        | "updatedAt"
        | "dueDate"
        | "title"
        | "priority"
        | "status";
      sortOrder?: "asc" | "desc";
    }
  ) {
    const result =
      await this.repository.findMany(
        projectId,
        options
      );

    const totalPages =
      Math.ceil(
        result.total / options.limit
      );

    return {
      tasks: result.tasks,

      pagination: {
        page: options.page,
        limit: options.limit,
        total: result.total,
        totalPages,

        hasNextPage:
          options.page < totalPages,

        hasPreviousPage:
          options.page > 1,
      },
    };
  }

  async getTask(
    projectId: string,
    taskId: string
  ) {
    const task =
      await this.repository.findById(
        projectId,
        taskId
      );

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async updateTask(
    projectId: string,
    taskId: string,
    data: any
  ) {
    await this.getTask(
      projectId,
      taskId
    );

    return this.repository.update(
      taskId,
      {
        ...data,

        ...(data.dueDate !== undefined
          ? {
              dueDate: data.dueDate
                ? new Date(data.dueDate)
                : null,
            }
          : {}),
      }
    );
  }

  async deleteTask(
    projectId: string,
    taskId: string
  ) {
    await this.getTask(
      projectId,
      taskId
    );

    await this.repository.delete(
      taskId
    );
  }
}