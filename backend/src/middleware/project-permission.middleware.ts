import { Request, Response, NextFunction } from "express";

import { prisma } from "../config/prisma";

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
      const userId = req.user?.userId;
      const projectId = req.params.projectId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (
        !projectId ||
        typeof projectId !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID",
        });
      }

      // --------------------------------
      // Check if project exists
      // --------------------------------

      const project =
        await prisma.project.findUnique({
          where: {
            id: projectId,
          },
          select: {
            id: true,
            ownerId: true,
          },
        });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      // --------------------------------
      // Project Owner
      // --------------------------------

      if (project.ownerId === userId) {
        if (!allowedRoles.includes("OWNER")) {
          return res.status(403).json({
            success: false,
            message:
              "You do not have permission to perform this action",
          });
        }

        req.projectMembership = {
          projectId,
          userId,
          role: "OWNER",
        };

        return next();
      }

      // --------------------------------
      // Project Member
      // --------------------------------

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

      // --------------------------------
      // Role Permission
      // --------------------------------

      const role =
        membership.role as ProjectRole;

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to perform this action",
        });
      }

      req.projectMembership = {
        projectId,
        userId,
        role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};