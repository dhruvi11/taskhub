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

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert("Signup", "Please fill all fields.");
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.logo}>TaskHub</Text>

        <Text style={styles.title}>Create account</Text>

        <Text style={styles.subtitle}>
          Start managing your projects and tasks.
        </Text>

        <View style={styles.form}>
          <AppInput
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

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
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <AppButton
            title="Create Account"
            onPress={handleSignup}
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <Text
              style={styles.loginLink}
              onPress={() => router.replace("/(auth)/login")}
            >
              {" "}
              Login
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

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.xl,
  },

  loginText: {
    color: COLORS.textSecondary,
  },

  loginLink: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});