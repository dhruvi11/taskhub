import { Request, Response } from "express";

import {
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema,
} from "../module/task/task.validation";

import { TaskService } from "../services/task.service";

export class TaskController {
  constructor(
    private readonly service: TaskService
  ) {}

  createTask = async (
    req: Request,
    res: Response
  ) => {
    const data =
      createTaskSchema.parse(req.body);

    const task =
      await this.service.createTask({
        ...data,
        projectId: req.params.projectId,
        createdById: req.user!.userId,
      });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  };

  listTasks = async (
    req: Request,
    res: Response
  ) => {
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(req.query.limit) || 10,
        1
      ),
      100
    );

    const result =
      await this.service.listTasks(
        req.params.projectId,
        {
          page,
          limit,
          search:
            req.query.search as string,
          status:
            req.query.status as any,
          priority:
            req.query.priority as any,
          assignedToId:
            req.query.assignedToId as string,
          sortBy:
            req.query.sortBy as any,
          sortOrder:
            req.query.sortOrder as any,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: result,
    });
  };

  getTask = async (
    req: Request,
    res: Response
  ) => {
    const task =
      await this.service.getTask(
        req.params.projectId,
        req.params.taskId
      );

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  };

  updateTask = async (
    req: Request,
    res: Response
  ) => {
    const data =
      updateTaskSchema.parse(req.body);

    const task =
      await this.service.updateTask(
        req.params.projectId,
        req.params.taskId,
        data
      );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  };

  deleteTask = async (
    req: Request,
    res: Response
  ) => {
    await this.service.deleteTask(
      req.params.projectId,
      req.params.taskId
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  };

  assignTask = async (
    req: Request,
    res: Response
  ) => {
    const data =
      assignTaskSchema.parse(req.body);

    const task =
      await this.service.assignTask(
        req.params.projectId,
        req.params.taskId,
        data.assignedToId
      );

    return res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      data: task,
    });
  };

  completeTask = async (
    req: Request,
    res: Response
  ) => {
    const task =
      await this.service.completeTask(
        req.params.projectId,
        req.params.taskId
      );

    return res.status(200).json({
      success: true,
      message: "Task completed successfully",
      data: task,
    });
  };
}