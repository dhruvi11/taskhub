import { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin.middleware";

import {
  getUsers,
  getProjects,
  getTasks,
  getActivity,
  getReports,
  updateUser,
  deleteUser,
  updateProject,
  deleteProject,
  updateTask,
  deleteTask,
} from "../controllers/admin.controller";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/projects", getProjects);
router.patch("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

router.get("/tasks", getTasks);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

router.get("/activity", getActivity);

router.get("/reports", getReports);

export default router;