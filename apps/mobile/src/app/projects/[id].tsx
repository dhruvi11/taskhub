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
import AppButton from "../../components/AppButton";
import AppHeader from "../../components/AppHeader";
import StatCard from "../../components/StatCard";
import { COLORS, SPACING } from "../../constants/theme";
import { projects } from "../../constants/mockData";

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const project = projects.find(
    (item) => item.id === id
  );

  if (!project) {
    return (
      <Screen>
        <AppHeader title="Project" />

        <AppCard>
          <Text style={styles.error}>
            Project not found.
          </Text>
        </AppCard>
      </Screen>
    );
  }

  const pending =
    project.tasksCount - project.completedTasks;

  return (
    <Screen>
      <Pressable
        onPress={() => router.back()}
        style={styles.back}
      >
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <AppHeader
        title={project.name}
        subtitle={project.description}
      />

      <View style={styles.row}>
        <StatCard
          title="Tasks"
          value={project.tasksCount}
          subtitle="Total"
        />

        <View style={styles.gap} />

        <StatCard
          title="Completed"
          value={project.completedTasks}
          subtitle="Finished"
        />
      </View>

      <View style={styles.row}>
        <StatCard
          title="Pending"
          value={pending}
          subtitle="Remaining"
        />

        <View style={styles.gap} />

        <StatCard
          title="Members"
          value={project.membersCount}
          subtitle="Project members"
        />
      </View>

      <AppCard>
        <Text style={styles.sectionTitle}>
          Project Information
        </Text>

        <InfoRow
          label="Owner"
          value={project.ownerName}
        />

        <InfoRow
          label="Status"
          value={project.status}
        />
      </AppCard>

      <AppButton
        title="View Project Tasks"
        onPress={() =>
          router.push({
            pathname: "/(tabs)/tasks",
            params: {
              projectId: project.id,
            },
          })
        }
      />
    </Screen>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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
    fontSize: 15,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },

  gap: {
    width: SPACING.md,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  label: {
    color: COLORS.textSecondary,
  },

  value: {
    color: COLORS.text,
    fontWeight: "700",
  },

  error: {
    color: COLORS.danger,
    fontSize: 16,
  },
});