import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodError } from "zod";

export const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      errors: error.issues,
    });
  }

  if (
    error instanceof Error &&
    error.message === "Task not found"
  ) {
    return res.status(404).json({
      success: false,
      code: "TASK_NOT_FOUND",
      message: "Task not found",
    });
  }

  return res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
};