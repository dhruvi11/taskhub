import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ReduxProvider from "../components/providers/ReduxProvider";
import { initializeSentry } from "../services/sentry.service";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initializeSentry();
  }, []);

  return (
    <ReduxProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="projects/[id]" />
          <Stack.Screen name="tasks/[id]" />
        </Stack>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
