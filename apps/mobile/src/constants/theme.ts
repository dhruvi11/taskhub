export const COLORS = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",

  background: "#F8FAFC",
  surface: "#FFFFFF",

  text: "#0F172A",
  textSecondary: "#64748B",
  textLight: "#94A3B8",

  border: "#E2E8F0",

  success: "#16A34A",
  successLight: "#DCFCE7",

  warning: "#D97706",
  warningLight: "#FEF3C7",

  danger: "#DC2626",
  dangerLight: "#FEE2E2",

  info: "#2563EB",
  infoLight: "#DBEAFE",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
};

// The Expo starter components use these semantic theme exports, while the
// TaskHub screens use the uppercase tokens above. Keep both APIs backed by
// the same palette so routes can be loaded together safely.
export const Colors = {
  light: {
    text: COLORS.text,
    textSecondary: COLORS.textSecondary,
    background: COLORS.background,
    backgroundElement: COLORS.surface,
    backgroundSelected: COLORS.infoLight,
    icon: COLORS.textSecondary,
    iconFocused: COLORS.primary,
    tint: COLORS.primary,
  },
  dark: {
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
    background: "#0F172A",
    backgroundElement: "#1E293B",
    backgroundSelected: "#1E3A5F",
    icon: "#94A3B8",
    iconFocused: "#60A5FA",
    tint: "#60A5FA",
  },
};

export type ThemeColor = keyof (typeof Colors)["light"];

export const Fonts = {
  mono: "monospace",
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
};

export const MaxContentWidth = 1120;
export const BottomTabInset = 56;
