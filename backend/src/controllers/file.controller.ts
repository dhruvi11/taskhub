import {
  Request,
  Response,
} from "express";

import { randomUUID } from "crypto";

import { S3Service } from "../services/s3.service";

import {
  validateFile,
} from "../utils/file-validation";

const s3Service =
  new S3Service();

export class FileController {
  createUploadUrl =
    async (
      req: Request,
      res: Response
    ) => {
      const {
        fileName,
        contentType,
        fileSize,
      } = req.body;

      if (
        !fileName ||
        !contentType ||
        !fileSize
      ) {
        return res.status(400).json({
          success: false,
          message:
            "fileName, contentType and fileSize are required",
        });
      }

      validateFile(
        contentType,
        Number(fileSize)
      );

      const userId =
        req.user!.userId;

      const extension =
        fileName.includes(".")
          ? fileName
              .split(".")
              .pop()
          : "bin";

      const key =
        `users/${userId}/profile/${randomUUID()}.${extension}`;

      const uploadUrl =
        await s3Service.createUploadUrl({
          key,
          contentType,
        });

      return res.status(200).json({
        success: true,
        message:
          "Upload URL generated successfully",
        data: {
          uploadUrl,
          key,
          expiresIn: 300,
        },
      });
    };

  createDownloadUrl =
    async (
      req: Request,
      res: Response
    ) => {
      const { key } = req.body;

      if (!key) {
        return res.status(400).json({
          success: false,
          message: "S3 key is required",
        });
      }

      const userId =
        req.user!.userId;

      if (
        !key.startsWith(
          `users/${userId}/`
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have access to this file",
        });
      }

      const downloadUrl =
        await s3Service.createDownloadUrl(
          key
        );

      return res.status(200).json({
        success: true,
        message:
          "Download URL generated successfully",
        data: {
          downloadUrl,
          expiresIn: 3600,
        },
      });
    };

  deleteFile =
    async (
      req: Request,
      res: Response
    ) => {
      const { key } = req.body;

      if (!key) {
        return res.status(400).json({
          success: false,
          message: "S3 key is required",
        });
      }

      const userId =
        req.user!.userId;

      if (
        !key.startsWith(
          `users/${userId}/`
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have access to this file",
        });
      }

      await s3Service.deleteFile(key);

      return res.status(200).json({
        success: true,
        message:
          "File deleted successfully",
      });
    };
}