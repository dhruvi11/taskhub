import "express";

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: string;
      accessToken?: string;
      refreshToken?: string;
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }

    interface ProjectMembership {
      projectId: string;
      userId: string;
      role: "OWNER" | "MANAGER" | "MEMBER";
    }

    interface Request {
      projectMembership?: ProjectMembership;
    }
  }
}

export {};
