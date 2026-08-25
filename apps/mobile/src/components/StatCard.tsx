import React from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  COLORS,
  RADIUS,
  SPACING,
} from "../constants/theme";

type Props = {
  title: string;
  value: number | string;
  subtitle: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 125,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  title: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },

  value: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: SPACING.sm,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});