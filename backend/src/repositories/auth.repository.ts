import { prisma } from "../config/prisma";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const createRefreshToken = async (data: {
  tokenHash: string;
  userId: string;
  expiresAt: Date;
}) => {
  return prisma.refreshToken.create({
    data,
  });
};    

export const findUserByGoogleId = async (googleId: string) => {
  return prisma.user.findUnique({
    where: {
      googleId,
    },
  });
};

export const updateUserGoogleId = async (userId: string, googleId: string) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      googleId,
    },
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password?: string | null;
  googleId?: string;
}) => {
  return prisma.user.create({
    data,
  });
};
