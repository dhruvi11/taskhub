import { TaskRepository } from "../repositories/task.repository";
import { UpdateTaskInput } from "../module/task/task.validation";

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
    data: UpdateTaskInput
  ) {
    await this.getTask(
      projectId,
      taskId
    );

    const { dueDate, ...taskData } = data;

    return this.repository.update(
      taskId,
      {
        ...taskData,

        ...(dueDate !== undefined
          ? {
              dueDate: dueDate
                ? new Date(dueDate)
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

  async assignTask(
    projectId: string,
    taskId: string,
    assignedToId: string,
  ) {
    await this.getTask(projectId, taskId);

    return this.repository.update(taskId, {
      assignedToId,
    });
  }

  async completeTask(
    projectId: string,
    taskId: string,
  ) {
    await this.getTask(projectId, taskId);

    return this.repository.update(taskId, {
      status: "COMPLETED",
    });
  }
}
