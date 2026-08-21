import { Request, Response, NextFunction } from "express";

import { prisma } from '../config/prisma';


type ProjectRole =
  | "OWNER"
  | "MANAGER"
  | "MEMBER";

export const requireProjectRole = (
  allowedRoles: ProjectRole[]
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const projectId = req.params.projectId;

      if (typeof projectId !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID",
        });
      }

      const membership =
        await prisma.projectMember.findUnique({
          where: {
            projectId_userId: {
              projectId,
              userId,
            },
          },
        });

      if (!membership) {
        return res.status(403).json({
          success: false,
          message:
            "You are not a member of this project",
        });
      }

      if (
        !allowedRoles.includes(
          membership.role as ProjectRole
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to perform this action",
        });
      }

      req.projectMembership = {
        projectId,
        userId,
        role: membership.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};