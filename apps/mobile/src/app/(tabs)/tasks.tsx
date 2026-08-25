import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "../../components/Screen";
import AppCard from "../../components/AppCard";
import AppHeader from "../../components/AppHeader";
import { COLORS, SPACING } from "../../constants/theme";
import { tasks } from "../../constants/mockData";

export default function TasksScreen() {
  const { projectId } = useLocalSearchParams<{
    projectId?: string;
  }>();

  const visibleTasks = projectId
    ? tasks.filter((task) => task.projectId === projectId)
    : tasks;

  return (
    <Screen>
      <AppHeader
        title="Tasks"
        subtitle="Track and manage your work."
      />

      {visibleTasks.map((task) => (
        <Pressable
          key={task.id}
          onPress={() =>
            router.push(`/tasks/${task.id}`)
          }
        >
          <AppCard>
            <View style={styles.header}>
              <Text style={styles.title}>
                {task.title}
              </Text>

              <Text
                style={[
                  styles.priority,
                  task.priority === "HIGH" &&
                    styles.high,
                  task.priority === "MEDIUM" &&
                    styles.medium,
                ]}
              >
                {task.priority}
              </Text>
            </View>

            <Text style={styles.project}>
              {task.projectName}
            </Text>

            <Text style={styles.description}>
              {task.description}
            </Text>

            <View style={styles.footer}>
              <Text style={styles.status}>
                {task.status.replace("_", " ")}
              </Text>

              <Text style={styles.date}>
                Due {task.dueDate}
              </Text>
            </View>
          </AppCard>
        </Pressable>
      ))}

      {visibleTasks.length === 0 && (
        <AppCard>
          <Text style={styles.empty}>
            No tasks found.
          </Text>
        </AppCard>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
    marginRight: SPACING.md,
  },

  priority: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.textSecondary,
  },

  high: {
    color: COLORS.danger,
  },

  medium: {
    color: COLORS.warning,
  },

  project: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.lg,
  },

  status: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: "700",
  },

  date: {
    color: COLORS.textLight,
    fontSize: 12,
  },

  empty: {
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});