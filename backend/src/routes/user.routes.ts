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

router.get(
  "/me",
  userController.getCurrentProfile
);

router.patch(
  "/me",
  userController.updateProfile
);

router.post(
  "/me/avatar",
  uploadAvatar.single("avatar"),
  userController.uploadAvatar
);

export default router;