import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodError } from "zod";

import {
  cloudWatchService,
} from "../services/cloudwatch.service";

import { Sentry } from "../config/sentry";
import { HttpError } from "../utils/http-error";

export const errorHandler = async (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const err =
    error instanceof Error
      ? error
      : new Error(String(error));

  // ============================================
  // SENTRY
  // ============================================

  Sentry.withScope((scope) => {
    scope.setTag("service", "taskhub-api");
    scope.setTag("component", "express");

    scope.setContext("request", {
      method: req.method,
      path: req.path,
      url: req.originalUrl,
    });

    if (req.user?.userId) {
      scope.setUser({
        id: req.user.userId,
      });
    }

    Sentry.captureException(err);
  });

  // ============================================
  // CLOUDWATCH
  // ============================================

  await cloudWatchService.log(
    "ERROR",
    err.message,
    {
      method: req.method,
      path: req.path,
      userId: req.user?.userId,
      stack: err.stack,
    },
  );

  // ============================================
  // CONSOLE
  // ============================================

  console.error(err);

  // ============================================
  // ZOD VALIDATION ERROR
  // ============================================

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

  // ============================================
  // CORS ERROR
  // ============================================

  if (
    err.message === "CORS origin not allowed"
  ) {
    return res.status(403).json({
      success: false,
      message: "Origin is not allowed",
      code: "CORS_ERROR",
    });
  }
// ============================================
// ZOD VALIDATION ERROR
// ============================================

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

// ============================================
// CORS ERROR
// ============================================

if (err.message === "CORS origin not allowed") {
  return res.status(403).json({
    success: false,
    message: "Origin is not allowed",
    code: "CORS_ERROR",
  });
}

// ============================================
// HTTP ERROR
// ============================================

if (err instanceof HttpError) {
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    code:
      err.statusCode === 401
        ? "UNAUTHORIZED"
        : "HTTP_ERROR",
  });
}

// ============================================
// DEFAULT ERROR
// ============================================

return res.status(500).json({
  success: false,
  message: "Internal server error",
  code: "INTERNAL_SERVER_ERROR",
});
};