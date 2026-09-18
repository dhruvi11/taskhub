import { prisma } from "../config/prisma";

export class AdminService {
  async getUsers(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
      },
    };
  }

  async getProjects(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {};

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              members: true,
              tasks: true,
            },
          },
        },
      }),
      prisma.project.count({ where }),
    ]);

    return {
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
      },
    };
  }

  async getTasks(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {};

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          dueDate: true,
          createdAt: true,
          updatedAt: true,
          project: {
            select: {
              id: true,
              name: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
      },
    };
  }

  async getActivity(limit = 20) {
    const [users, projects, tasks] = await Promise.all([
      prisma.user.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),

      prisma.project.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          createdAt: true,
          owner: {
            select: {
              name: true,
            },
          },
        },
      }),

      prisma.task.findMany({
        take: limit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    const activity = [
      ...users.map((user) => ({
        type: "USER_REGISTERED",
        id: user.id,
        message: `${user.name} registered`,
        actor: user.name,
        timestamp: user.createdAt,
      })),

      ...projects.map((project) => ({
        type: "PROJECT_CREATED",
        id: project.id,
        message: `${project.name} was created`,
        actor: project.owner.name,
        timestamp: project.createdAt,
      })),

      ...tasks.map((task) => ({
        type: "TASK_UPDATED",
        id: task.id,
        message: `Task "${task.title}" is ${task.status}`,
        actor: task.createdBy.name,
        timestamp: task.updatedAt,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() -
          new Date(a.timestamp).getTime(),
      )
      .slice(0, limit);

    return activity;
  }

  async getReports() {
    const [
      totalUsers,
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.task.count(),
      prisma.task.count({
        where: { status: "COMPLETED" },
      }),
      prisma.task.count({
        where: { status: "TODO" },
      }),
      prisma.task.count({
        where: { status: "IN_PROGRESS" },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
      },
      projects: {
        total: totalProjects,
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
      },
    };
  }

  async updateUser(
    id: string,
    data: {
      name?: string;
      role?: "USER" | "ADMIN";
    },
  ) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    });

    return { id };
  }

  async updateProject(
    id: string,
    data: {
      name?: string;
      description?: string;
      status?: "ACTIVE" | "ARCHIVED";
    },
  ) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async deleteProject(id: string) {
    await prisma.project.delete({
      where: { id },
    });

    return { id };
  }

  async updateTask(
    id: string,
    data: {
      title?: string;
      status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
      priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    },
  ) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string) {
    await prisma.task.delete({
      where: { id },
    });

    return { id };
  }
}

export const adminService = new AdminService();