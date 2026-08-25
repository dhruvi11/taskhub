import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, SPACING } from "../constants/theme";

type Props = {
  title: string;
  subtitle?: string;
};

export default function AppHeader({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
});