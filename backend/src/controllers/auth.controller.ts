import { Request, Response } from "express";

import { registerSchema, loginSchema } from "../module/auth/auth.validation";

import { register, login, getCurrentUser } from "../services/auth.service";

export const registerController = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const result = await register(data.name, data.email, data.password);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const result = await login(data.email, data.password);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const meController = async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.user!.userId);

  return res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    data: user,
  });
};
