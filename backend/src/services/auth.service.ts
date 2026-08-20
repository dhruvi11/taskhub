import {
  findUserByEmail,
  findUserByGoogleId,
  createUser,
  updateUserGoogleId,
} from "../repositories/auth.repository";
import {
  hashPassword,
  comparePassword,
} from '../utils/password';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt';

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

export const createAuthTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId);

  const refreshToken = generateRefreshToken(userId);

  return {
    accessToken,
    refreshToken,
  };
};

export const authenticateGoogleUser = async ({
  googleId,
  email,
  name,
}: {
  googleId: string;
  email: string;
  name: string;
}) => {
  const user = await findOrCreateGoogleUser({
    googleId,
    email,
    name,
  });

  const tokens = createAuthTokens(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    ...tokens,
  };
};
export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};
export const findOrCreateGoogleUser = async ({
  googleId,
  email,
  name,
}: {
  googleId: string;
  email: string;
  name: string;
}) => {
  // 1. Find by Google ID
  const googleUser = await findUserByGoogleId(googleId);

  if (googleUser) {
    return googleUser;
  }

  // 2. Find by email
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    // Link Google account
    return updateUserGoogleId(
      existingUser.id,
      googleId,
    );
  }

  // 3. Create new user
  return createUser({
    name,
    email,
    password: null,
    googleId,
  });
};