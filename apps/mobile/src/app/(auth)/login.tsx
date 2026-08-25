import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import { COLORS, SPACING } from "../../constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Login", "Please enter email and password.");
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.logo}>TaskHub</Text>

        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.subtitle}>
          Sign in to continue to TaskHub.
        </Text>

        <View style={styles.form}>
          <AppInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <AppButton
            title="Login"
            onPress={handleLogin}
          />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <Text
              style={styles.signupLink}
              onPress={() => router.push("/(auth)/signup")}
            >
              {" "}
              Sign up
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 32,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 32,
  },

  form: {
    width: "100%",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.xl,
  },

  signupText: {
    color: COLORS.textSecondary,
  },

  signupLink: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});