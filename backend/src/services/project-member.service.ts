import { ProjectMemberRepository } from "../repositories/project-member.repository";

export class ProjectMemberService {
  constructor(private readonly repository: ProjectMemberRepository) {}

  async listMembers(projectId: string) {
    return this.repository.findMembers(projectId);
  }

  async addMember(
    projectId: string,
    userId: string,
    role: "MANAGER" | "MEMBER",
  ) {
    const existing = await this.repository.findMember(projectId, userId);

    if (existing) {
      throw new Error("User is already a member of this project");
    }

    return this.repository.addMember(projectId, userId, role);
  }

  async updateMemberRole(
    projectId: string,
    userId: string,
    role: "MANAGER" | "MEMBER",
  ) {
    const member = await this.repository.findMember(projectId, userId);

    if (!member) {
      throw new Error("Project member not found");
    }

    if (member.role === "OWNER") {
      throw new Error("Project owner role cannot be changed");
    }

    return this.repository.updateRole(projectId, userId, role);
  }

  async removeMember(projectId: string, userId: string) {
    const member = await this.repository.findMember(projectId, userId);

    if (!member) {
      throw new Error("Project member not found");
    }

    if (member.role === "OWNER") {
      throw new Error("Project owner cannot be removed");
    }

    await this.repository.removeMember(projectId, userId);

    return {
      userId,
      projectId,
    };
  }
}
