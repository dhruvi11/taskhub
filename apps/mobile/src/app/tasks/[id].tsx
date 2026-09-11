import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "../../components/Screen";
import AppCard from "../../components/AppCard";
import AppHeader from "../../components/AppHeader";
import { COLORS, SPACING } from "../../constants/theme";
import { tasks } from "../../constants/mockData";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return (
      <Screen>
        <AppHeader title="Task" />

        <AppCard>
          <Text style={styles.error}>Task not found.</Text>
        </AppCard>
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <AppHeader title={task.title} subtitle={task.projectName} />

      <AppCard>
        <Text style={styles.sectionTitle}>Description</Text>

        <Text style={styles.description}>{task.description}</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Task Information</Text>

        <InfoRow label="Status" value={task.status.replace("_", " ")} />

        <InfoRow label="Priority" value={task.priority} />

        <InfoRow label="Assignee" value={task.assignee} />

        <InfoRow label="Due Date" value={task.dueDate} />
      </AppCard>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    marginBottom: SPACING.lg,
  },

  backText: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: SPACING.md,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  label: {
    color: COLORS.textSecondary,
  },

  value: {
    color: COLORS.text,
    fontWeight: "700",
    maxWidth: "60%",
    textAlign: "right",
  },

  error: {
    color: COLORS.danger,
  },
});
