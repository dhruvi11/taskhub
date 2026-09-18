import { prisma } from "../config/prisma";

export class DashboardService {
  async getDashboard() {
    const [
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      todoTasks,
      recentProjects,
      recentTasks,
    ] = await Promise.all([
      prisma.project.count(),

      prisma.task.count(),

      prisma.task.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.task.count({
        where: {
          status: "TODO",
        },
      }),

      prisma.task.count({
        where: {
          status: "IN_PROGRESS",
        },
      }),

      prisma.task.count({
        where: {
          status: "TODO",
        },
      }),

      prisma.project.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
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
        take: 5,
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
        },
      }),
    ]);

    const recentActivity = [
      ...recentProjects.map((project) => ({
        type: "PROJECT_CREATED",
        message: `${project.name} was created`,
        timestamp: project.createdAt,
      })),

      ...recentTasks.map((task) => ({
        type: "TASK_UPDATED",
        message: `${task.title} → ${task.status}`,
        timestamp: task.updatedAt,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() -
          new Date(a.timestamp).getTime(),
      )
      .slice(0, 10);

    return {
      totals: {
        projects: totalProjects,
        tasks: totalTasks,
        completedTasks,
        pendingTasks,
      },

      taskStatus: {
        TODO: todoTasks,
        IN_PROGRESS: inProgressTasks,
        COMPLETED: completedTasks,
      },

      recentActivity,
    };
  }
}

export const dashboardService = new DashboardService();