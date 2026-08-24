import {
  findUserByEmail,
  findUserByGoogleId,
  createUser,
  updateUserGoogleId,
  findUserById,
  createRefreshToken,
} from "../repositories/auth.repository";

import {
  hashPassword,
  comparePassword,
} from "../utils/password";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";


// ========================================
// CREATE AUTH TOKENS
// ========================================

export const createAuthTokens = async (
  userId: string,
  role: string,
) => {
  const accessToken =
    generateAccessToken(userId, role);

  const refreshToken =
    generateRefreshToken(userId);

  return {
    accessToken,
    refreshToken,
  };
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
    throw new Error("User already exists");
  }

  const hashedPassword =
    await hashPassword(password);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
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
// LOGIN
// ========================================

export const login = async (
  email: string,
  password: string,
) => {
  const user =
    await findUserByEmail(email);

  if (!user) {
    throw new Error(
      "Invalid email or password",
    );
  }

  if (!user.password) {
    throw new Error(
      "This account does not have a password. Please use Google login.",
    );
  }

  const isPasswordValid =
    await comparePassword(
      password,
      user.password,
    );

  if (!isPasswordValid) {
    throw new Error(
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
    throw new Error("User not found");
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

    // 1. Find by Google ID

    const googleUser =
      await findUserByGoogleId(googleId);

    if (googleUser) {
      return googleUser;
    }

    // 2. Find by email

    const existingUser =
      await findUserByEmail(email);

    if (existingUser) {
      return updateUserGoogleId(
        existingUser.id,
        googleId,
      );
    }

    // 3. Create new Google user

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