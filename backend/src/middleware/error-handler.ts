import {
  Request,
  Response,
  NextFunction,
} from "express";
import {
  cloudWatchService,
} from "../services/cloudwatch.service";
import { ZodError } from "zod";

export const errorHandler = async (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {

  await cloudWatchService.log(
  "ERROR",
  error.message,
  {
    method: _req.method,
    path: _req.path,
    userId: _req.user?.userId,
    stack: error.stack,
  }
);
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (
    error instanceof Error &&
    error.message === "CORS origin not allowed"
  ) {
    return res.status(403).json({
      success: false,
      message: "Origin is not allowed",
      code: "CORS_ERROR",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};