import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import "./auth/google.strategy";
import authRoutes from "./auth/auth.routes";

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

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskHub API is running",
  });
});

export default app;