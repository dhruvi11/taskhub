import { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import { uploadAvatar } from "../middleware/upload";

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
 *   post:
 *     tags: [Users]
 *     summary: Upload the current user's avatar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [avatar]
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: JPEG, PNG, or WEBP image up to 5 MB.
 *     responses:
 *       200: { description: Avatar upload prepared successfully }
 *       400: { description: Avatar is missing or invalid }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.post(
  "/me/avatar",
  uploadAvatar.single("avatar"),
  userController.uploadAvatar
);

export default router;
