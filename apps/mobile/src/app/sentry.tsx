import * as Sentry from "@sentry/react-native";

let initialized = false;

export function initializeSentry() {
  if (initialized) {
    return;
  }

  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    console.warn("Sentry DSN is not configured");
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.EXPO_PUBLIC_SENTRY_ENVIRONMENT ?? "development",
  });

  initialized = true;

  console.log("✅ Sentry initialized");
}

export function captureSentryError(error: unknown) {
  if (error instanceof Error) {
    Sentry.captureException(error);
  } else {
    Sentry.captureException(new Error(String(error)));
  }
}

export function captureSentryMessage(message: string) {
  Sentry.captureMessage(message);
}

export function setSentryUser(userId: string) {
  Sentry.setUser({
    id: userId,
  });
}
