import { Router } from "express";

import { authMiddleware } from "../middleware/auth";

import { ProjectRepository } from "../repositories/project.repository";
import { ProjectService } from "../services/project.service";
import { ProjectController } from "../controllers/project.controller";

const router = Router();

const projectRepository =
  new ProjectRepository();

const projectService =
  new ProjectService(projectRepository);

const projectController =
  new ProjectController(projectService);

router.use(authMiddleware);

router.post(
  "/",
  projectController.createProject
);

router.get(
  "/",
  projectController.getProjects
);

router.get(
  "/:id",
  projectController.getProject
);

router.patch(
  "/:id",
  projectController.updateProject
);

router.delete(
  "/:id",
  projectController.deleteProject
);

export default router;