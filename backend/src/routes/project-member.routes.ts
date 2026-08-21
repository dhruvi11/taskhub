import { Router } from "express";

import { authMiddleware } from "../middleware/auth";

import {
  requireProjectRole,
} from "../middleware/project-permission.middleware";

import { ProjectMemberRepository } from "../repositories/project-member.repository";
import { ProjectMemberService } from "../services/project-member.service";
import { ProjectMemberController } from "../controllers/project-member.controller";

const router = Router();

const repository =
  new ProjectMemberRepository();

const service =
  new ProjectMemberService(repository);

const controller =
  new ProjectMemberController(service);

router.use(authMiddleware);

router.get(
  "/",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.listMembers
);

router.post(
  "/",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.addMember
);

router.patch(
  "/:userId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.updateMemberRole
);

router.delete(
  "/:userId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.removeMember
);

export default router;