import { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import {
  requireProjectRole,
} from "../middleware/project-permission.middleware";

import { ProjectMemberRepository } from "../repositories/project-member.repository";
import { ProjectMemberService } from "../services/project-member.service";
import { ProjectMemberController } from "../controllers/project-member.controller";

const router = Router({
  mergeParams: true,
});

const repository =
  new ProjectMemberRepository();

const service =
  new ProjectMemberService(repository);

const controller =
  new ProjectMemberController(service);

router.use(authMiddleware);

/**
 * @swagger
 * /api/v1/projects/{projectId}/members:
 *   get:
 *     tags: [Project Members]
 *     summary: List project members
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *     responses:
 *       200: { description: Project members fetched successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *   post:
 *     tags: [Project Members]
 *     summary: Add a member to a project
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId]
 *             properties:
 *               userId: { type: string, format: uuid }
 *               role: { type: string, enum: [MANAGER, MEMBER], default: MEMBER }
 *     responses:
 *       201: { description: Project member added successfully }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
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

/**
 * @swagger
 * /api/v1/projects/{projectId}/members/{userId}:
 *   patch:
 *     tags: [Project Members]
 *     summary: Change a project member's role
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role: { type: string, enum: [MANAGER, MEMBER] }
 *     responses:
 *       200: { description: Project member role updated successfully }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *   delete:
 *     tags: [Project Members]
 *     summary: Remove a project member
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200: { description: Project member removed successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
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
