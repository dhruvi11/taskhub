import * as Sentry from "@sentry/node";

const environment = process.env.NODE_ENV || "development";

export function initializeSentry() {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn) {
    console.warn("SENTRY_DSN is not configured. Sentry disabled.");

    return;
  }

  Sentry.init({
    dsn,
    environment,

    tracesSampleRate: environment === "production" ? 0.2 : 1.0,

    sendDefaultPii: false,

    release:
      process.env.SENTRY_RELEASE ||
      process.env.npm_package_version ||
      "taskhub-api@dev",
  });

  console.log(`Sentry initialized: ${environment}`);
}

export { Sentry };
