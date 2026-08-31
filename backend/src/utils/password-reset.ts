import crypto from "crypto";

const RESET_EXPIRY =
  Number(
    process.env.PASSWORD_RESET_EXPIRES_MINUTES
  ) || 30;

const resetTokens =
  new Map<
    string,
    {
      userId: string;
      expiresAt: number;
    }
  >();

export const createPasswordResetToken = (
  userId: string
) => {
  const token =
    crypto.randomBytes(32).toString("hex");

  resetTokens.set(token, {
    userId,
    expiresAt:
      Date.now() +
      RESET_EXPIRY * 60 * 1000,
  });

  return token;
};

export const consumePasswordResetToken = (
  token: string
) => {
  const record =
    resetTokens.get(token);

  if (!record) {
    return null;
  }

  resetTokens.delete(token);

  if (
    record.expiresAt <
    Date.now()
  ) {
    return null;
  }

  return record.userId;
};