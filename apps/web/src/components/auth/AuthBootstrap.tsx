"use client";

import { useEffect } from "react";

import { useGetCurrentUserQuery } from "@/src/store/api";

import {
  setUser,
} from "@/src/store/slices/authSlice";

import {
  useAppDispatch,
} from "@/src/store/hooks";

export default function AuthBootstrap() {
  const dispatch =
    useAppDispatch();

  const hasToken =
    typeof window !== "undefined" &&
    !!localStorage.getItem(
      "accessToken",
    );

  const {
    data,
    isLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setUser(
          data.data,
        ),
      );
    }
  }, [data, dispatch]);

  if (isLoading) {
    return null;
  }

  return null;
}
