import {
  findUserByEmail,
  findUserByGoogleId,
  createUser,
  updateUserGoogleId,
  findUserById,
} from "../repositories/auth.repository";

import { createPasswordResetToken } from "../utils/password-reset";
import { passwordResetEmail } from "../emails/password-reset.email";
import { hashPassword, comparePassword } from "../utils/password";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

import { hashRefreshToken } from "../utils/refresh-token";

import { emailService } from "./email.service";
import { welcomeEmail } from "../emails/welcome.email";
import { UnauthorizedError } from "../utils/http-error";

import { prisma } from "../config/prisma";

// ========================================
// CREATE AUTH TOKENS
// ========================================

export const createAuthTokens = async (
  userId: string,
  role: string,
) => {
  const accessToken = generateAccessToken(userId, role);

  const refreshToken = generateRefreshToken(userId);

  const tokenHash = hashRefreshToken(refreshToken);

  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  );

  await prisma.refreshToken.create({
    data: {
      tokenHash,
      userId,
      expiresAt,
    },
  });

  return {
    accessToken,
    refreshToken,
  };
};

// ========================================
// ROTATE REFRESH TOKEN
// ========================================

export const rotateRefreshToken = async (
  refreshToken: string,
) => {
  const tokenHash = hashRefreshToken(refreshToken);

  const storedToken =
    await prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
      include: {
        user: true,
      },
    });

  if (!storedToken) {
    throw new UnauthorizedError(
      "Invalid refresh token",
    );
  }

  if (storedToken.revokedAt) {
    throw new UnauthorizedError(
      "Refresh token has already been revoked",
    );
  }

  if (storedToken.expiresAt <= new Date()) {
    await prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    throw new UnauthorizedError(
      "Refresh token has expired",
    );
  }

  const newRefreshToken =
    generateRefreshToken(
      storedToken.userId,
    );

  const newTokenHash =
    hashRefreshToken(newRefreshToken);

  const newExpiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  );

  const newToken =
    await prisma.refreshToken.create({
      data: {
        tokenHash: newTokenHash,
        userId: storedToken.userId,
        expiresAt: newExpiresAt,
      },
    });

  await prisma.refreshToken.update({
    where: {
      id: storedToken.id,
    },
    data: {
      revokedAt: new Date(),
      replacedBy: newToken.id,
    },
  });

  const accessToken =
    generateAccessToken(
      storedToken.userId,
      storedToken.user.role,
    );

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

// ========================================
// REVOKE REFRESH TOKEN
// ========================================

export const revokeRefreshToken = async (
  refreshToken: string,
) => {
  const tokenHash =
    hashRefreshToken(refreshToken);

  await prisma.refreshToken.updateMany({
    where: {
      tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};

// ========================================
// REVOKE ALL USER TOKENS
// ========================================

export const revokeAllUserRefreshTokens =
  async (userId: string) => {
    await prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  };

// ========================================
// REGISTER
// ========================================

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser =
    await findUserByEmail(email);

  if (existingUser) {
    throw new Error(
      "User already exists",
    );
  }

  const hashedPassword =
    await hashPassword(password);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const welcome = welcomeEmail({
    name: user.name,
  });

  await emailService.sendSafeEmail({
    to: user.email,
    subject: welcome.subject,
    html: welcome.html,
    text: welcome.text,
  });

  const tokens = await createAuthTokens(
    user.id,
    user.role,
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
};

// ========================================
// LOGIN
// ========================================

export const login = async (
  email: string,
  password: string,
) => {
  const user =
    await findUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError(
      "Invalid email or password",
    );
  }

  if (!user.password) {
    throw new UnauthorizedError(
      "This account does not have a password. Please use Google login.",
    );
  }

  const isPasswordValid =
    await comparePassword(
      password,
      user.password,
    );

  if (!isPasswordValid) {
    throw new UnauthorizedError(
      "Invalid email or password",
    );
  }

  const tokens =
    await createAuthTokens(
      user.id,
      user.role,
    );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...tokens,
  };
};

// ========================================
// CURRENT USER
// ========================================

export const getCurrentUser = async (
  userId: string,
) => {
  const user =
    await findUserById(userId);

  if (!user) {
    throw new Error(
      "User not found",
    );
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    googleId: user.googleId,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// ========================================
// GOOGLE USER
// ========================================

export const findOrCreateGoogleUser =
  async ({
    googleId,
    email,
    name,
  }: {
    googleId: string;
    email: string;
    name: string;
  }) => {
    const googleUser =
      await findUserByGoogleId(
        googleId,
      );

    if (googleUser) {
      return googleUser;
    }

    const existingUser =
      await findUserByEmail(email);

    if (existingUser) {
      return updateUserGoogleId(
        existingUser.id,
        googleId,
      );
    }

    return createUser({
      name,
      email,
      password: null,
      googleId,
    });
  };

// ========================================
// GOOGLE AUTHENTICATION
// ========================================

export const authenticateGoogleUser =
  async ({
    googleId,
    email,
    name,
  }: {
    googleId: string;
    email: string;
    name: string;
  }) => {
    const user =
      await findOrCreateGoogleUser({
        googleId,
        email,
        name,
      });

    const tokens =
      await createAuthTokens(
        user.id,
        user.role,
      );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  };

// ========================================
// PASSWORD RESET
// ========================================

export const requestPasswordReset =
  async (email: string) => {
    const user =
      await findUserByEmail(email);

    if (!user) {
      return;
    }

    const token =
      createPasswordResetToken(
        user.id,
      );

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:3000";

    const resetUrl =
      `${frontendUrl}/reset-password?token=${token}`;

    const emailContent =
      passwordResetEmail({
        name: user.name,
        resetUrl,
      });

    await emailService.sendSafeEmail({
      to: user.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
  };