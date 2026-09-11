import { Router } from "express";

import { authMiddleware } from "../middleware/auth";

import { ProjectRepository } from "../repositories/project.repository";
import { ProjectService } from "../services/project.service";
import { ProjectController } from "../controllers/project.controller";

const router = Router();

const projectRepository = new ProjectRepository();

const projectService = new ProjectService(projectRepository);

const projectController = new ProjectController(projectService);

router.use(authMiddleware);

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     tags: [Projects]
 *     summary: Create a project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, minLength: 2, maxLength: 100, example: Website redesign }
 *               description: { type: string, maxLength: 1000, example: Redesign the public website. }
 *     responses:
 *       201: { description: Project created successfully }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *   get:
 *     tags: [Projects]
 *     summary: List projects available to the current user
 *     parameters:
 *       - { name: page, in: query, schema: { type: integer, minimum: 1, default: 1 } }
 *       - { name: limit, in: query, schema: { type: integer, minimum: 1, maximum: 100, default: 10 } }
 *       - { name: search, in: query, schema: { type: string } }
 *       - { name: status, in: query, schema: { type: string, enum: [ACTIVE, ARCHIVED] } }
 *       - { name: sortBy, in: query, schema: { type: string, enum: [name, createdAt, updatedAt], default: createdAt } }
 *       - { name: sortOrder, in: query, schema: { type: string, enum: [asc, desc], default: desc } }
 *     responses:
 *       200: { description: Projects fetched successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.post("/", projectController.createProject);

router.get("/", projectController.getProjects);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Get a project by ID
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *     responses:
 *       200: { description: Project fetched successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       404: { description: Project not found }
 *   patch:
 *     tags: [Projects]
 *     summary: Update a project
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, minLength: 2, maxLength: 100 }
 *               description: { type: string, maxLength: 1000, nullable: true }
 *               status: { type: string, enum: [ACTIVE, ARCHIVED] }
 *     responses:
 *       200: { description: Project updated successfully }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       404: { description: Project not found }
 *   delete:
 *     tags: [Projects]
 *     summary: Delete a project
 *     parameters:
 *       - $ref: '#/components/parameters/ProjectId'
 *     responses:
 *       200: { description: Project deleted successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       404: { description: Project not found }
 */
router.get("/:id", projectController.getProject);

router.patch("/:id", projectController.updateProject);

router.delete("/:id", projectController.deleteProject);

export default router;
