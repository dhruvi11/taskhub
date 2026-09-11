import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import Screen from "../../components/Screen";
import AppCard from "../../components/AppCard";
import AppHeader from "../../components/AppHeader";
import { COLORS, SPACING } from "../../constants/theme";
import { projects } from "../../constants/mockData";

export default function ProjectsScreen() {
  return (
    <Screen>
      <AppHeader title="Projects" subtitle="Manage your projects." />

      {projects.map((project) => (
        <Pressable
          key={project.id}
          onPress={() => router.push(`/projects/${project.id}`)}
        >
          <AppCard>
            <View style={styles.header}>
              <Text style={styles.name}>{project.name}</Text>

              <View style={styles.status}>
                <Text style={styles.statusText}>{project.status}</Text>
              </View>
            </View>

            <Text style={styles.description}>{project.description}</Text>

            <View style={styles.footer}>
              <Text style={styles.meta}>{project.tasksCount} tasks</Text>

              <Text style={styles.meta}>{project.membersCount} members</Text>
            </View>
          </AppCard>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginRight: SPACING.md,
  },

  status: {
    backgroundColor: COLORS.successLight,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.success,
  },

  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    lineHeight: 20,
  },

  footer: {
    flexDirection: "row",
    gap: 20,
    marginTop: SPACING.lg,
  },

  meta: {
    color: COLORS.textLight,
    fontSize: 13,
  },
});
