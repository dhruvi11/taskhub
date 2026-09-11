import {
  CreateProjectInput,
  ProjectListQuery,
  UpdateProjectInput,
} from "../module/project/project.validation";

import { ProjectRepository } from "../repositories/project.repository";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(ownerId: string, data: CreateProjectInput) {
    return this.projectRepository.create({
      ...data,
      ownerId,
    });
  }

  async getProjects(ownerId: string, query: ProjectListQuery) {
    const { projects, total } = await this.projectRepository.findMany(
      ownerId,
      query,
    );

    return {
      projects,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getProject(userId: string, projectId: string) {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    this.checkOwnership(project.ownerId, userId);

    return project;
  }

  async updateProject(
    userId: string,
    projectId: string,
    data: UpdateProjectInput,
  ) {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    this.checkOwnership(project.ownerId, userId);

    return this.projectRepository.update(projectId, data);
  }

  async deleteProject(userId: string, projectId: string) {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    this.checkOwnership(project.ownerId, userId);

    await this.projectRepository.delete(projectId);

    return {
      id: projectId,
    };
  }

  private checkOwnership(ownerId: string, userId: string) {
    if (ownerId !== userId) {
      throw new Error("You are not authorized to manage this project");
    }
  }
}
