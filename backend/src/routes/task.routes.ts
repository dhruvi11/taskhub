import { Router } from "express";

import { authMiddleware } from "../middleware/auth";

import {
  requireProjectRole,
} from "../middleware/project-permission.middleware";

import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";

const router = Router({
  mergeParams: true,
});

const repository =
  new TaskRepository();

const service =
  new TaskService(repository);

const controller =
  new TaskController(service);

router.use(authMiddleware);

router.get(
  "/",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.listTasks
);

router.post(
  "/",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.createTask
);

router.get(
  "/:taskId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.getTask
);

router.patch(
  "/:taskId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.updateTask
);

router.delete(
  "/:taskId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.deleteTask
);

router.patch(
  "/:taskId/assign",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.assignTask
);

router.patch(
  "/:taskId/complete",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.completeTask
);

export default router;