import { Request, Response } from "express";
import { adminService } from "../services/admin.service";

export const getUsers = async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(req.query.limit) || 20),
  );

  const search =
    typeof req.query.search === "string"
      ? req.query.search
      : undefined;

  const data = await adminService.getUsers(page, limit, search);

  return res.json({
    success: true,
    data,
  });
};

export const getProjects = async (
  req: Request,
  res: Response,
) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(req.query.limit) || 20),
  );

  const search =
    typeof req.query.search === "string"
      ? req.query.search
      : undefined;

  const data = await adminService.getProjects(
    page,
    limit,
    search,
  );

  return res.json({
    success: true,
    data,
  });
};

export const getTasks = async (
  req: Request,
  res: Response,
) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(req.query.limit) || 20),
  );

  const search =
    typeof req.query.search === "string"
      ? req.query.search
      : undefined;

  const data = await adminService.getTasks(
    page,
    limit,
    search,
  );

  return res.json({
    success: true,
    data,
  });
};

export const getActivity = async (
  req: Request,
  res: Response,
) => {
  const limit = Math.min(
    100,
    Math.max(1, Number(req.query.limit) || 20),
  );

  const data = await adminService.getActivity(limit);

  return res.json({
    success: true,
    data,
  });
};

export const getReports = async (
  _req: Request,
  res: Response,
) => {
  const data = await adminService.getReports();

  return res.json({
    success: true,
    data,
  });
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await adminService.updateUser(
    req.params.id,
    req.body,
  );

  return res.json({
    success: true,
    message: "User updated successfully",
    data,
  });
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await adminService.deleteUser(req.params.id);

  return res.json({
    success: true,
    message: "User deleted successfully",
    data,
  });
};

export const updateProject = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await adminService.updateProject(
    req.params.id,
    req.body,
  );

  return res.json({
    success: true,
    message: "Project updated successfully",
    data,
  });
};

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await adminService.deleteProject(
    req.params.id,
  );

  return res.json({
    success: true,
    message: "Project deleted successfully",
    data,
  });
};

export const updateTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await adminService.updateTask(
    req.params.id,
    req.body,
  );

  return res.json({
    success: true,
    message: "Task updated successfully",
    data,
  });
};

export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await adminService.deleteTask(req.params.id);

  return res.json({
    success: true,
    message: "Task deleted successfully",
    data,
  });
};