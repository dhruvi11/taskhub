import { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service";

export const getDashboard = async (
  _req: Request,
  res: Response,
) => {
  const data = await dashboardService.getDashboard();

  return res.status(200).json({
    success: true,
    message: "Dashboard fetched successfully",
    data,
  });
};