import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  constructor(
    private readonly repository: TaskRepository
  ) {}

  async createTask(data: {
    title: string;
    description?: string;
    priority:
      | "LOW"
      | "MEDIUM"
      | "HIGH"
      | "URGENT";
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
    options: any
  ) {
    return this.repository.findMany(
      projectId,
      options
    );
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

  async assignTask(
    projectId: string,
    taskId: string,
    assignedToId: string
  ) {
    await this.getTask(
      projectId,
      taskId
    );

    return this.repository.update(
      taskId,
      {
        assignedToId,
      }
    );
  }

  async completeTask(
    projectId: string,
    taskId: string
  ) {
    await this.getTask(
      projectId,
      taskId
    );

    return this.repository.update(
      taskId,
      {
        status: "COMPLETED",
      }
    );
  }
}