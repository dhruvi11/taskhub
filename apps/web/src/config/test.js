"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryTest() {
  const testError = () => {
    Sentry.captureException(
      new Error("TaskHub Next.js Sentry test")
    );
  };

  return (
    <button onClick={testError}>
      Test Sentry
    </button>
  );
}