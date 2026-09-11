import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { COLORS, RADIUS, SPACING } from "../constants/theme";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

export default function AppButton({
  title,
  onPress,
  loading = false,
  variant = "primary",
}: Props) {
  const backgroundColor =
    variant === "danger"
      ? COLORS.danger
      : variant === "secondary"
        ? COLORS.surface
        : COLORS.primary;

  const textColor = variant === "secondary" ? COLORS.primary : COLORS.surface;

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          opacity: pressed || loading ? 0.75 : 1,
        },
        variant === "secondary" && styles.secondary,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.md,
  },

  secondary: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});
