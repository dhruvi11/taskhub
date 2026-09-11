import * as Sentry from "@sentry/react-native";

export function initializeSentry() {
  const dsn =
    process.env.EXPO_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    console.warn(
      "EXPO_PUBLIC_SENTRY_DSN is not configured"
    );

    return;
  }

  Sentry.init({
    dsn,

    environment:
      process.env.NODE_ENV || "development",

    tracesSampleRate: 1.0,

    enableAutoSessionTracking: true,
  });

  console.log("Sentry initialized");
}

export function setSentryUser(
  userId: string
) {
  Sentry.setUser({
    id: userId,
  });
}

export function captureException(
  error: unknown
) {
  if (error instanceof Error) {
    Sentry.captureException(error);
  } else {
    Sentry.captureException(
      new Error(String(error))
    );
  }
}

export function captureMessage(
  message: string
) {
  Sentry.captureMessage(message);
}
