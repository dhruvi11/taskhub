import { Request, Response } from "express";

import { ProjectService } from "../services/project.service";

import {
  createProjectSchema,
  projectListQuerySchema,
  updateProjectSchema,
} from "../module/project/project.validation";

export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
  ) {}

  createProject = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user!.userId;

    const data =
      createProjectSchema.parse(req.body);

    const project =
      await this.projectService.createProject(
        userId,
        data
      );

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  };

  getProjects = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user!.userId;

    const query =
      projectListQuerySchema.parse(req.query);

    const result =
      await this.projectService.getProjects(
        userId,
        query
      );

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: result,
    });
  };

  getProject = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user!.userId;

    const project =
      await this.projectService.getProject(
        userId,
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  };

  updateProject = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user!.userId;

    const data =
      updateProjectSchema.parse(req.body);

    const project =
      await this.projectService.updateProject(
        userId,
        req.params.id,
        data
      );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  };

  deleteProject = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user!.userId;

    const result =
      await this.projectService.deleteProject(
        userId,
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: result,
    });
  };
}