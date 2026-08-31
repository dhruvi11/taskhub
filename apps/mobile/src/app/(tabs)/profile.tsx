import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { router } from "expo-router";

import Screen from "../../components/Screen";
import AppCard from "../../components/AppCard";
import AppButton from "../../components/AppButton";
import AppHeader from "../../components/AppHeader";
import { COLORS, SPACING } from "../../constants/theme";
import { currentUser } from "../../constants/mockData";

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () =>
            router.replace("/(auth)/login"),
        },
      ]
    );
  };

  return (
    <Screen>
      <AppHeader
        title="Profile"
        subtitle="Manage your account."
      />

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
         <Image
  source={{
    uri: currentUser.avatarUrl,
  }}
/>
        </Text>
      </View>

      <Text style={styles.name}>
        {currentUser.name}
      </Text>

      <Text style={styles.email}>
        {currentUser.email}
      </Text>

      <AppCard>
        <InfoRow
          label="Name"
          value={currentUser.name}
        />

        <InfoRow
          label="Email"
          value={currentUser.email}
        />
      </AppCard>

      <AppButton
        title="Logout"
        variant="danger"
        onPress={handleLogout}
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  avatarText: {
    color: COLORS.surface,
    fontSize: 36,
    fontWeight: "800",
  },

  name: {
    textAlign: "center",
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginTop: SPACING.md,
  },

  email: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: SPACING.xl,
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
    fontWeight: "600",
    maxWidth: "65%",
    textAlign: "right",
  },
});