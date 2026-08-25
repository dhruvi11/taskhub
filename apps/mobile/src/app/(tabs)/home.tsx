import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../../components/Screen";
import AppCard from "../../components/AppCard";
import AppHeader from "../../components/AppHeader";
import StatCard from "../../components/StatCard";
import { COLORS, SPACING } from "../../constants/theme";
import { projects, tasks } from "../../constants/mockData";

export default function HomeScreen() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <Screen>
      <AppHeader
        title="Dashboard"
        subtitle="Welcome back to TaskHub."
      />

      <View style={styles.row}>
        <StatCard
          title="Projects"
          value={projects.length}
          subtitle="Total projects"
        />

        <View style={styles.gap} />

        <StatCard
          title="Tasks"
          value={totalTasks}
          subtitle="Across projects"
        />
      </View>

      <View style={styles.row}>
        <StatCard
          title="Completed"
          value={completedTasks}
          subtitle="Tasks completed"
        />

        <View style={styles.gap} />

        <StatCard
          title="Pending"
          value={pendingTasks}
          subtitle="Tasks remaining"
        />
      </View>

      <AppCard>
        <Text style={styles.sectionTitle}>
          Recent Projects
        </Text>

        {projects.slice(0, 3).map((project) => (
          <View key={project.id} style={styles.projectRow}>
            <View style={styles.projectDot} />

            <View style={styles.projectContent}>
              <Text style={styles.projectName}>
                {project.name}
              </Text>

              <Text style={styles.projectDescription}>
                {project.description}
              </Text>
            </View>
          </View>
        ))}
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },

  gap: {
    width: SPACING.md,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },

  projectRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },

  projectDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginTop: 5,
    marginRight: SPACING.md,
  },

  projectContent: {
    flex: 1,
  },

  projectName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  projectDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
});