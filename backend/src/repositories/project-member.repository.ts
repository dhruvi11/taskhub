import { prisma } from '../config/prisma';
import { projectInvitationEmail } from '../emails/project-invitation.email';
import { emailService } from '../services/email.service';

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
    const existing = await this.findMember(projectId, userId);

  if (existing) {
    throw new Error(
      "User is already a member of this project"
    );
  }

    const member = await prisma.projectMember.create({
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

  const [user, project] =
    await Promise.all([
      prisma.user.findUnique({
        where: {
          id: userId,
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
    const email =
      projectInvitationEmail({
        name: user.name,
        projectName: project.name,
        role,
      });

    await emailService.sendSafeEmail({
      to: user.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
  }

    return member;
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
