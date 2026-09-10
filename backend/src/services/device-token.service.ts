import {
  Platform,
} from "react-native";

import {
  getFCMToken,
} from "./firebase.service";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:5050/api/v1";

export async function registerDeviceToken(
  accessToken: string
) {
  const token =
    await getFCMToken();

  if (!token) {
    return null;
  }

  const response =
    await fetch(
      `${API_URL}/notifications/device-token`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          token,
          platform:
            Platform.OS,
        }),
      }
    );

  if (!response.ok) {
    const body =
      await response.text();

    throw new Error(
      `Device token registration failed: ${body}`
    );
  }

  return response.json();
}

export async function removeDeviceToken(
  accessToken: string,
  token: string
) {
  const response =
    await fetch(
      `${API_URL}/notifications/device-token`,
      {
        method: "DELETE",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          token,
        }),
      }
    );

  if (!response.ok) {
    throw new Error(
      "Failed to remove device token"
    );
  }

  return response.json();
}