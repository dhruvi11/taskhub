import { prisma } from "../config/prisma";

type TaskUpdateData = {
  title?: string;
  description?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: Date | null;
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
  assignedToId?: string;
};

export class TaskRepository {
  async create(data: {
    title: string;
    description?: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate?: Date;
    projectId: string;
    createdById: string;
    assignedToId?: string;
  }) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate,
        projectId: data.projectId,
        createdById: data.createdById,
        assignedToId: data.assignedToId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findMany(
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
    const {
      page,
      limit,
      search,
      status,
      priority,
      assignedToId,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    const skip = (page - 1) * limit;

    const where = {
      projectId,

      ...(status
        ? {
            status,
          }
        : {}),

      ...(priority
        ? {
            priority,
          }
        : {}),

      ...(assignedToId
        ? {
            assignedToId,
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          [sortBy]: sortOrder,
        },

        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      prisma.task.count({
        where,
      }),
    ]);

    return {
      tasks,
      total,
    };
  }

  async findById(projectId: string, taskId: string) {
    return prisma.task.findFirst({
      where: {
        id: taskId,
        projectId,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(taskId: string, data: TaskUpdateData) {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    });
  }

  async delete(taskId: string) {
    return prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
