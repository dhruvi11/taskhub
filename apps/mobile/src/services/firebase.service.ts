import { Platform } from "react-native";

import { getApp } from "@react-native-firebase/app";

import {
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  requestPermission,
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

export const isFirebaseNative =
  Platform.OS === "ios" || Platform.OS === "android";

/**
 * Get the native Firebase app.
 *
 * RNFirebase is not available on web.
 */
function getFirebaseApp() {
  if (!isFirebaseNative) {
    return null;
  }

  return getApp();
}

// =====================================================
// FCM
// =====================================================

export async function getFCMToken() {
  if (!isFirebaseNative) {
    console.log("Firebase Messaging is not available on web");
    return null;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return null;
  }

  const messaging = getMessaging(firebaseApp);

  const permission = await requestPermission(messaging);

  const enabled =
    permission === AuthorizationStatus.AUTHORIZED ||
    permission === AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.log("Notification permission denied");
    return null;
  }

  const token = await getToken(messaging);

  console.log("🔥 FCM TOKEN:", token);

  return token;
}

export function listenForMessages(
  callback: (message: any) => void
) {
  if (!isFirebaseNative) {
    return () => {};
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return () => {};
  }

  const messaging = getMessaging(firebaseApp);

  return onMessage(messaging, callback);
}

export function listenForTokenRefresh(
  callback: (token: string) => void
) {
  if (!isFirebaseNative) {
    return () => {};
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return () => {};
  }

  const messaging = getMessaging(firebaseApp);

  return onTokenRefresh(messaging, callback);
}

// =====================================================
// ANALYTICS
// =====================================================

export async function trackLogin(
  method = "email"
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const analytics = getAnalytics(firebaseApp);

  await logEvent(analytics, "login", {
    method,
  });
}

export async function trackSignup(
  method = "email"
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const analytics = getAnalytics(firebaseApp);

  await logEvent(analytics, "sign_up", {
    method,
  });
}

export async function trackTaskCreated(
  taskId: string
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const analytics = getAnalytics(firebaseApp);

  await logEvent(analytics, "task_created", {
    task_id: taskId,
  });
}

export async function trackTaskAssigned(
  taskId: string
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const analytics = getAnalytics(firebaseApp);

  await logEvent(analytics, "task_assigned", {
    task_id: taskId,
  });
}

export async function trackTaskCompleted(
  taskId: string
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const analytics = getAnalytics(firebaseApp);

  await logEvent(analytics, "task_completed", {
    task_id: taskId,
  });
}

// =====================================================
// CRASHLYTICS
// =====================================================

export async function identifyUser(
  userId: string
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const crashlytics = getCrashlytics(firebaseApp);

  await setUserId(crashlytics, userId);
}

export function logCrashlytics(
  message: string
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const crashlytics = getCrashlytics(firebaseApp);

  log(crashlytics, message);
}

export function recordCrashlyticsError(
  error: unknown
) {
  if (!isFirebaseNative) {
    return;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return;
  }

  const crashlytics = getCrashlytics(firebaseApp);

  if (error instanceof Error) {
    recordError(crashlytics, error);
  } else {
    recordError(
      crashlytics,
      new Error(String(error))
    );
  }
}