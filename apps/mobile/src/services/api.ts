import { Platform } from "react-native";

const API_PORT = 5050;

export const API_BASE_URL =
  Platform.OS === "android"
    ? `http://10.0.2.2:${API_PORT}/api/v1`
    : `http://localhost:${API_PORT}/api/v1`;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...(options.headers || {}),
      },
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Something went wrong"
    );
  }

  return data;
}