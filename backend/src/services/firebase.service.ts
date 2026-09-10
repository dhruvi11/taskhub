import {
  getApp,
} from "@react-native-firebase/app";

import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  onTokenRefresh,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";

import {
  getAnalytics,
  logEvent,
} from "@react-native-firebase/analytics";

import {
  getCrashlytics,
  setUserId,
  recordError,
  log,
} from "@react-native-firebase/crashlytics";

const app = getApp();

const messaging =
  getMessaging(app);

const analytics =
  getAnalytics(app);

const crashlytics =
  getCrashlytics(app);

export async function requestNotificationPermission() {
  const status =
    await requestPermission(
      messaging
    );

  return (
    status ===
      AuthorizationStatus.AUTHORIZED ||
    status ===
      AuthorizationStatus.PROVISIONAL
  );
}

export async function getFCMToken() {
  const allowed =
    await requestNotificationPermission();

  if (!allowed) {
    console.log(
      "Notification permission denied"
    );

    return null;
  }

  const token =
    await getToken(messaging);

  console.log(
    "🔥 FCM TOKEN:",
    token
  );

  return token;
}

export function subscribeToMessages(
  callback: (
    message: any
  ) => void
) {
  return onMessage(
    messaging,
    callback
  );
}

export function subscribeToTokenRefresh(
  callback: (
    token: string
  ) => void
) {
  return onTokenRefresh(
    messaging,
    callback
  );
}

// Analytics

export async function logLoginEvent(
  method = "email"
) {
  await logEvent(
    analytics,
    "login",
    {
      method,
    }
  );
}

export async function logSignupEvent(
  method = "email"
) {
  await logEvent(
    analytics,
    "signup",
    {
      method,
    }
  );
}

export async function logTaskCreatedEvent(
  taskId: string
) {
  await logEvent(
    analytics,
    "task_created",
    {
      task_id: taskId,
    }
  );
}

export async function logTaskAssignedEvent(
  taskId: string
) {
  await logEvent(
    analytics,
    "task_assigned",
    {
      task_id: taskId,
    }
  );
}

export async function logTaskCompletedEvent(
  taskId: string
) {
  await logEvent(
    analytics,
    "task_completed",
    {
      task_id: taskId,
    }
  );
}

// Crashlytics

export async function setCrashlyticsUser(
  userId: string
) {
  await setUserId(
    crashlytics,
    userId
  );
}

export function logCrashlyticsMessage(
  message: string
) {
  log(
    crashlytics,
    message
  );
}

export function recordCrashlyticsError(
  error: unknown
) {
  if (error instanceof Error) {
    recordError(
      crashlytics,
      error
    );
  } else {
    recordError(
      crashlytics,
      new Error(
        String(error)
      )
    );
  }
}