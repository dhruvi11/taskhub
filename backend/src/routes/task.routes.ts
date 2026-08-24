
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

/**
 * @swagger
 * /api/v1/projects/{projectId}/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get project tasks
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum:
 *             - TODO
 *             - IN_PROGRESS
 *             - COMPLETED
 *
 *       - name: priority
 *         in: query
 *         schema:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *             - URGENT
 *
 *       - name: assignedToId
 *         in: query
 *         schema:
 *           type: string
 *           format: uuid
 *
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum:
 *             - createdAt
 *             - updatedAt
 *             - dueDate
 *             - title
 *             - priority
 *             - status
 *
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *
 *       400:
 *         description: Invalid query parameters
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: User is not a project member
 */

router.get(
  "/",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.listTasks
);


/**
 * @swagger
 * /api/v1/projects/{projectId}/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a task
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 example: Build authentication API
 *               description:
 *                 type: string
 *                 example: Implement JWT authentication
 *               priority:
 *                 type: string
 *                 enum:
 *                   - LOW
 *                   - MEDIUM
 *                   - HIGH
 *                   - URGENT
 *                 example: HIGH
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-08-30T18:00:00.000Z
 *               assignedToId:
 *                 type: string
 *                 format: uuid
 *
 *     responses:
 *       201:
 *         description: Task created successfully
 *
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.createTask
);

/**
 * @swagger
 * /api/v1/projects/{projectId}/tasks/{taskId}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get a task
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *
 *       404:
 *         description: Task not found
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 */
router.get(
  "/:taskId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
    "MEMBER",
  ]),
  controller.getTask
);

/**
 * @swagger
 * /api/v1/projects/{projectId}/tasks/{taskId}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum:
 *                   - LOW
 *                   - MEDIUM
 *                   - HIGH
 *                   - URGENT
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *
 *     responses:
 *       200:
 *         description: Task updated successfully
 *
 *       404:
 *         description: Task not found
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:taskId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.updateTask
);

/**
 * @swagger
 * /api/v1/projects/{projectId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *
 *       404:
 *         description: Task not found
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:taskId",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.deleteTask
);

/**
 * @swagger
 * /api/v1/projects/{projectId}/tasks/{taskId}/assign:
 *   patch:
 *     tags: [Tasks]
 *     summary: Assign a task to a project member
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *       - $ref: '#/components/parameters/TaskId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [assignedToId]
 *             properties:
 *               assignedToId: { type: string, format: uuid }
 *     responses:
 *       200: { description: Task assigned successfully }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { description: Task not found }
 */
router.patch(
  "/:taskId/assign",
  requireProjectRole([
    "OWNER",
    "MANAGER",
  ]),
  controller.assignTask
);

/**
 * @swagger
 * /api/v1/projects/{projectId}/tasks/{taskId}/complete:
 *   patch:
 *     tags: [Tasks]
 *     summary: Mark a task as completed
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *       - $ref: '#/components/parameters/TaskId'
 *     responses:
 *       200: { description: Task completed successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { description: Task not found }
 */
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
