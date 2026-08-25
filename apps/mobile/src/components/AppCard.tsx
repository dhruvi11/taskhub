import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { COLORS, RADIUS, SPACING } from "../constants/theme";

export default function AppCard({
  children,
}: {
  children: ReactNode;
}) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
});