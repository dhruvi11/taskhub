import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import notificationRoutes from "./routes/notification.routes";
import "./module/auth/google.strategy";
import fileRoutes from "./routes/file.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import projectMemberRoutes from "./routes/project-member.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/error-handler";
import { cloudWatchRequestMiddleware } from "./middleware/cloudwatch.middleware";
import adminRoutes from "./routes/admin.routes";
import dashboardRoutes from "./routes/dashboard.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { apiRateLimiter } from "./middleware/rate-limit";


const app = express();


app.use(cloudWatchRequestMiddleware);

app.use(helmet());

const allowedOrigins =
  process.env.CORS_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) || [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests such as curl/Postman with no Origin header
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(apiRateLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(passport.initialize());

// ===============================
// AUTH
// ===============================

app.use("/api/v1/auth", authRoutes);

// ===============================
// FILE
// ===============================

app.use("/api/v1/files", fileRoutes);

// ===============================
// USERS
// ===============================

app.use("/api/v1/users", userRoutes);

// ===============================
// PROJECTS
// ===============================

app.use("/api/v1/projects", projectRoutes);

// ===============================
// PROJECT MEMBERS
// ===============================

app.use("/api/v1/projects/:projectId/members", projectMemberRoutes);

// ===============================
// FCM Notifications
// ===============================
app.use("/api/v1/notifications", notificationRoutes);

// ===============================
// TASKS
// ===============================

app.use("/api/v1/projects/:projectId/tasks", taskRoutes);

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check API health
 *     security: []
 *     responses:
 *       200:
 *         description: API is running
 */
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskHub API is running",
  });
});

/**
 * @swagger
 * /api/v1/test/sentry:
 *   get:
 *     tags:
 *       - Test
 *     summary: Test Sentry error reporting
 *     security: []
 *     responses:
 *       500:
 *         description: Sentry test error thrown
 */
app.get("/api/v1/test/sentry", () => {
  throw new Error("TaskHub Sentry test error");
});

/**
 * @swagger
 * /api/v1/admin
 *   get:
 *     tags:
 *       - Test
 *     summary: Test rate limiting
 *     security: []
 *     responses:
 *       200:
 *         description: 
 */

app.use("/api/v1/admin", adminRoutes);

/**
 * @swagger
 * /api/v1/dashboard  
 *   get:
 *     tags:
 *       - Test
 *     summary: Test rate limiting
 *     security: []
 *     responses:
 *       200:
 *         description: 
 */

app.use("/api/v1/dashboard", dashboardRoutes);
// app.use(errorMiddleware);
app.use(errorHandler);
export default app;
