import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function getApiErrorMessage(error: unknown, fallback: string) {
  const apiError = error as FetchBaseQueryError & {
    data?: { message?: string; error?: string };
  };

  if (apiError?.data?.message) return apiError.data.message;
  if (apiError?.data?.error) return apiError.data.error;
  if (apiError?.status === "FETCH_ERROR")
    return "Unable to reach the API. Check that the backend is running.";
  return fallback;
}
