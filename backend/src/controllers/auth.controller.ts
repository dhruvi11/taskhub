import { Request, Response } from "express";

import {
  registerSchema,
  loginSchema,
} from "../module/auth/auth.validation";

import {
  register,
  login,
  getCurrentUser,
  rotateRefreshToken,
  revokeRefreshToken,
} from "../services/auth.service";

const REFRESH_COOKIE_NAME =
  "taskhub_refresh_token";

const setRefreshCookie = (
  res: Response,
  token: string,
) => {
  res.cookie(
    REFRESH_COOKIE_NAME,
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",
      path: "/api/v1/auth",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
    },
  );
};

const clearRefreshCookie = (
  res: Response,
) => {
  res.clearCookie(
    REFRESH_COOKIE_NAME,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",
      path: "/api/v1/auth",
    },
  );
};

// ========================================
// REGISTER
// ========================================

export const registerController =
  async (
    req: Request,
    res: Response,
  ) => {
    const data =
      registerSchema.parse(
        req.body,
      );

    const result =
      await register(
        data.name,
        data.email,
        data.password,
      );

    setRefreshCookie(
      res,
      result.refreshToken,
    );

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: {
        user: result.user,
        accessToken:
          result.accessToken,
      },
    });
  };

// ========================================
// LOGIN
// ========================================

export const loginController =
  async (
    req: Request,
    res: Response,
  ) => {
    const data =
      loginSchema.parse(
        req.body,
      );

    const result =
      await login(
        data.email,
        data.password,
      );

    setRefreshCookie(
      res,
      result.refreshToken,
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken:
          result.accessToken,
      },
    });
  };

// ========================================
// REFRESH
// ========================================

export const refreshController =
  async (
    req: Request,
    res: Response,
  ) => {
    const refreshToken =
      req.cookies[
        REFRESH_COOKIE_NAME
      ];

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message:
          "Refresh token is missing",
      });
    }

    const result =
      await rotateRefreshToken(
        refreshToken,
      );

    setRefreshCookie(
      res,
      result.refreshToken,
    );

    return res.status(200).json({
      success: true,
      message:
        "Token refreshed successfully",
      data: {
        accessToken:
          result.accessToken,
      },
    });
  };

// ========================================
// LOGOUT
// ========================================

export const logoutController =
  async (
    req: Request,
    res: Response,
  ) => {
    const refreshToken =
      req.cookies[
        REFRESH_COOKIE_NAME
      ];

    if (refreshToken) {
      await revokeRefreshToken(
        refreshToken,
      );
    }

    clearRefreshCookie(res);

    return res.status(200).json({
      success: true,
      message:
        "Logged out successfully",
    });
  };

// ========================================
// ME
// ========================================

export const meController = async (
  req: Request,
  res: Response,
) => {
  const user =
    await getCurrentUser(
      req.user!.userId,
    );

  return res.status(200).json({
    success: true,
    message:
      "Current user fetched successfully",
    data: user,
  });
};