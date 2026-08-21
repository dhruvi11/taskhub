import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import "./module/auth/google.strategy";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import projectMemberRoutes from "./routes/project-member.routes";

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

app.use(
  "/api/v1/auth",
  authRoutes,
);

app.use(
  "/api/v1/users",
  userRoutes
);

app.use(
  "/api/v1/projects",
  projectRoutes
);

app.use(
  "/api/v1/projects/:projectId/members",
  projectMemberRoutes
);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskHub API is running",
  });
});

export default app;