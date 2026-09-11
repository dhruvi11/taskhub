import { Router } from "express";

import passport from "passport";

import {
  registerController,
  loginController,
  meController,
} from "../controllers/auth.controller";

import { authMiddleware } from "../middleware/auth";
import { authRateLimiter } from "../middleware/rate-limit";

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, minLength: 2, maxLength: 100, example: Ada Lovelace }
 *               email: { type: string, format: email, example: ada@example.com }
 *               password: { type: string, format: password, minLength: 8, example: SecurePass123! }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { $ref: '#/components/responses/ValidationError' }
 */

// ========================================
// REGISTER
// ========================================

router.post("/register", registerController);

// ========================================
// LOGIN
// ========================================

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in with email and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: ada@example.com }
 *               password: { type: string, format: password, minLength: 8, example: SecurePass123! }
 *     responses:
 *       200: { description: Login successful }
 *       400: { $ref: '#/components/responses/ValidationError' }
 */
router.post("/login", loginController);

// ========================================
// CURRENT USER
// ========================================

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get the authenticated user
 *     responses:
 *       200: { description: Current user fetched successfully }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/me", authMiddleware, meController);

// ========================================
// GOOGLE LOGIN
// ========================================

/**
 * @swagger
 * /api/v1/auth/google:
 *   get:
 *     tags: [Authentication]
 *     summary: Begin Google OAuth sign-in
 *     description: Redirects to Google for authentication.
 *     security: []
 *     responses:
 *       302: { description: Redirect to Google OAuth consent screen }
 */
router.get(
  "/google",
  authRateLimiter,
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
  }),
);

// ========================================
// GOOGLE CALLBACK
// ========================================

/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     tags: [Authentication]
 *     summary: Complete Google OAuth sign-in
 *     security: []
 *     responses:
 *       200: { description: Google authentication successful }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get(
  "/google/callback",
  authRateLimiter,
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Google authentication successful",
      data: req.user,
    });
  },
);

export default router;
