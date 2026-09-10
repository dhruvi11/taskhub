import { Platform } from "react-native";

import {
  getFCMToken,
} from "./firebase.service";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  console.warn(
    "EXPO_PUBLIC_API_URL is not configured"
  );
}

export async function registerDeviceToken(
  accessToken: string
) {
  if (Platform.OS === "web") {
    console.log(
      "Device token registration is not available on web"
    );

    return null;
  }

  const token = await getFCMToken();

  if (!token) {
    return null;
  }

  const response = await fetch(
    `${API_URL}/notifications/device-token`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${accessToken}`,
      },

      body: JSON.stringify({
        token,
        platform: Platform.OS,
      }),
    }
  );

  if (!response.ok) {
    const error =
      await response.text();

    throw new Error(
      `Device token registration failed: ${error}`
    );
  }

  return response.json();
}