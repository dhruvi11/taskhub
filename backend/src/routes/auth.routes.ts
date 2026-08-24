import { Router } from "express";

import passport from "passport";

import {
  registerController,
  loginController,
  meController,
} from "../controllers/auth.controller";

import { authMiddleware } from "../middleware/auth";

const router = Router();


// ========================================
// REGISTER
// ========================================

router.post(
  "/register",
  registerController,
);


// ========================================
// LOGIN
// ========================================

router.post(
  "/login",
  loginController,
);


// ========================================
// CURRENT USER
// ========================================

router.get(
  "/me",
  authMiddleware,
  meController,
);


// ========================================
// GOOGLE LOGIN
// ========================================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "openid",
      "profile",
      "email",
    ],
  }),
);


// ========================================
// GOOGLE CALLBACK
// ========================================

router.get(
  "/google/callback",
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