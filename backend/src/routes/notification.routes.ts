import { Router } from "express";

import { authMiddleware } from "../middleware/auth";

import { NotificationController } from "../controllers/notification.controller";

const router = Router();

const controller = new NotificationController();

router.use(authMiddleware);

router.post("/device-token", controller.registerDeviceToken);

router.delete("/device-token", controller.removeDeviceToken);

export default router;
