import { Router } from "express";

import { authMiddleware } from "../middleware/auth";

import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.use(authMiddleware);

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get the current user's profile
 *     responses:
 *       200: { description: Profile fetched successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get(
  "/me",
  userController.getCurrentProfile
);

/**
 * @swagger
 * /api/v1/users/me:
 *   patch:
 *     tags: [Users]
 *     summary: Update the current user's profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, minLength: 2, maxLength: 100, example: Ada Lovelace }
 *               email: { type: string, format: email, example: ada@example.com }
 *     responses:
 *       200: { description: Profile updated successfully }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.patch(
  "/me",
  userController.updateProfile
);

/**
 * @swagger
 * /api/v1/users/me/avatar:
 *   patch:
 *     tags: [Users]
 *     summary: Save the current user's S3 avatar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - avatarUrl
 *             properties:
 *               avatarUrl:
 *                 type: string
 *                 example: users/USER_ID/profile/uuid.jpg
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *       400:
 *         description: Invalid avatar key
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.patch(
  "/me/avatar",
  userController.updateAvatar
);


export default router;
