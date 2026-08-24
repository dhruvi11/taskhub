import jwt from "jsonwebtoken";

const accessSecret =
  process.env.JWT_ACCESS_SECRET;

const refreshSecret =
  process.env.JWT_REFRESH_SECRET;

if (!accessSecret || !refreshSecret) {
  throw new Error(
    "JWT secrets are not configured",
  );
}

export interface AccessTokenPayload {
  userId: string;
  role: string;
}

export interface RefreshTokenPayload {
  userId: string;
}

export const generateAccessToken = (
  userId: string,
  role: string,
): string => {
  return jwt.sign(
    {
      userId,
      role,
    },
    accessSecret,
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = (
  userId: string,
): string => {
  return jwt.sign(
    {
      userId,
    },
    refreshSecret,
    {
      expiresIn: "7d",
    },
  );
};