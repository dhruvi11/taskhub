import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import "./module/auth/google.strategy";
import fileRoutes from "./routes/file.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import projectMemberRoutes from "./routes/project-member.routes";
import taskRoutes from "./routes/task.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { errorHandler } from "./middleware/error-handler";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(helmet());

cors({
  origin: true,
  credentials: true,
});

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

app.use(errorMiddleware);
app.use(errorHandler);
export default app;
