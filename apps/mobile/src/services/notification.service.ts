import { Platform } from "react-native";

import {
  getMessaging,
  getToken,
  requestPermission,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";

import { getApp } from "@react-native-firebase/app";

export async function initializeNotifications() {
  if (Platform.OS === "web") {
    console.log("Firebase notifications are not available on web");

    return null;
  }

  const firebaseApp = getApp();

  const messaging = getMessaging(firebaseApp);

  const authStatus = await requestPermission(messaging);

  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.log("Notification permission not granted");

    return null;
  }

  const token = await getToken(messaging);

  console.log("🔥 FCM TOKEN:", token);

  return token;
}
