import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import "./module/auth/google.strategy";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import projectMemberRoutes from "./routes/project-member.routes";
import taskRoutes from "./routes/task.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(passport.initialize());


// ===============================
// AUTH
// ===============================

app.use(
  "/api/v1/auth",
  authRoutes,
);


// ===============================
// USERS
// ===============================

app.use(
  "/api/v1/users",
  userRoutes,
);


// ===============================
// PROJECTS
// ===============================

app.use(
  "/api/v1/projects",
  projectRoutes,
);


// ===============================
// PROJECT MEMBERS
// ===============================

app.use(
  "/api/v1/projects/:projectId/members",
  projectMemberRoutes,
);


// ===============================
// TASKS
// ===============================

app.use(
  "/api/v1/projects/:projectId/tasks",
  taskRoutes,
);


// ===============================
// HEALTH
// ===============================

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskHub API is running",
  });
});

app.use(errorMiddleware);

export default app;