import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { COLORS } from "../constants/theme";

import { getFCMToken } from "../services/firebase.service";

export default function Index() {
  useEffect(() => {
    getFCMToken()
      .then((token) => {
        console.log(
          "Firebase FCM token:",
          token
        );
      })
      .catch((error) => {
        console.error(
          "Firebase initialization error:",
          error
        );
      });
  }, []);
 useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>T</Text>
      </View>

      <Text style={styles.title}>TaskHub</Text>

      <Text style={styles.subtitle}>
        Manage projects. Complete tasks.
      </Text>

      <ActivityIndicator
        size="small"
        color={COLORS.primary}
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: COLORS.surface,
    fontSize: 42,
    fontWeight: "800",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 20,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  loader: {
    marginTop: 28,
  },
});