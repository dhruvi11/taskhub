import { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import { FileController } from "../controllers/file.controller";

const router = Router();

const controller =
  new FileController();

router.use(authMiddleware);

router.post(
  "/upload-url",
  controller.createUploadUrl
);

router.post(
  "/download-url",
  controller.createDownloadUrl
);

router.delete(
  "/",
  controller.deleteFile
);

export default router;