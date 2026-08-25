"use client";

import {
  ReactNode,
  useEffect,
} from "react";

import {
  Provider,
} from "react-redux";

import { store } from "@/src/store";

import {
  hydrateAuth,
} from "@/src/store/slices/authSlice";
import AuthBootstrap from "@/src/components/auth/AuthBootstrap";

interface Props {
  children: ReactNode;
}

export default function ReduxProvider({
  children,
}: Props) {
  useEffect(() => {
    store.dispatch(
      hydrateAuth(),
    );
  }, []);

  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
}
