import { prisma } from '../config/prisma';

export class ProjectMemberRepository {
  async findMembers(projectId: string) {
    return prisma.projectMember.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async findMember(
    projectId: string,
    userId: string
  ) {
    return prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async addMember(
    projectId: string,
    userId: string,
    role: "MANAGER" | "MEMBER"
  ) {
    return prisma.projectMember.create({
      data: {
        projectId,
        userId,
        role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async updateRole(
    projectId: string,
    userId: string,
    role: "MANAGER" | "MEMBER"
  ) {
    return prisma.projectMember.update({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      data: {
        role,
      },
    });
  }

  async removeMember(
    projectId: string,
    userId: string
  ) {
    return prisma.projectMember.delete({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });
  }
}