import { Request, Response } from "express";

import {
  createTaskSchema,
  taskQuerySchema,
  updateTaskSchema,
  assignTaskSchema,
} from "../module/task/task.validation";

import { TaskService } from "../services/task.service";

type TaskParams = {
  projectId: string;
  taskId: string;
};

export class TaskController {
  constructor(
    private readonly service: TaskService
  ) {}

  createTask = async (
    req: Request<TaskParams>,
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
    req: Request<TaskParams>,
    res: Response
  ) => {
    const query = taskQuerySchema.parse(req.query);

    const result =
      await this.service.listTasks(
        req.params.projectId,
        query
      );

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: result,
    });
  };

  getTask = async (
    req: Request<TaskParams>,
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
    req: Request<TaskParams>,
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
    req: Request<TaskParams>,
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
    req: Request<TaskParams>,
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
    req: Request<TaskParams>,
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
