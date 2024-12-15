import React, { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Theme, ThemeContextValue } from "../types/theme";
import { Dimensions } from "react-native";
import { ToastMessage } from "./toastMessage";

const { width, height } = Dimensions.get("window");
const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const theme: Theme = {
  colors: {
    light: {
      // Primary palette
      primary: "#6366F1", // Indigo
      secondary: "#8B5CF6", // Purple
      accent: "#EC4899", // Pink

      // Semantic colors
      success: "#10B981", // Emerald
      warning: "#F59E0B", // Amber
      danger: "#EF4444", // Red
      info: "#3B82F6", // Blue

      // Neutrals
      background: "#FFFFFF",
      surface: "#F9FAFB",
      surfaceHover: "#F3F4F6",

      // Text
      text: "#111827",
      textMedium: "#374151",
      textLight: "#6B7280",

      // Border
      border: "#E5E7EB",
      borderFocus: "#6366F1",

      // Status
      online: "#34D399",
      offline: "#9CA3AF",

      // Additional
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    dark: {
      // Primary palette
      primary: "#818CF8", // Lighter Indigo
      secondary: "#A78BFA", // Lighter Purple
      accent: "#F472B6", // Lighter Pink

      // Semantic colors
      success: "#34D399", // Lighter Emerald
      warning: "#FBBF24", // Lighter Amber
      danger: "#F87171", // Lighter Red
      info: "#60A5FA", // Lighter Blue

      // Neutrals
      background: "#111827",
      surface: "#1F2937",
      surfaceHover: "#374151",

      // Text
      text: "#F9FAFB",
      textMedium: "#E5E7EB",
      textLight: "#9CA3AF",

      // Border
      border: "#374151",
      borderFocus: "#818CF8",

      // Status
      online: "#34D399",
      offline: "#6B7280",

      // Additional
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
  },

  // Typography
  typography: {
    fonts: {
      regular: "System",
      medium: "System-Medium",
      bold: "System-Bold",
    },
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      "2xl": 24,
      "3xl": 30,
      "4xl": 36,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
    },
  },

  // Spacing
  spacing: {
    "2xs": 4,
    xs: 8,
    sm: 12,
    base: 16,
    lg: 20,
    xl: 24,
    "2xl": 32,
    "3xl": 40,
    "4xl": 48,
  },

  // Border Radii
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  // Shadows
  shadows: {
    sm: {
      light: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      },
      dark: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
      },
    },
    base: {
      light: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      },
      dark: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      },
    },
    lg: {
      light: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
      },
      dark: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
      },
    },
  },

  // Layout
  layout: {
    screenWidth: width,
    screenHeight: height,
    maxWidth: 428, // Max width for content containers
    contentPadding: 16,
  },

  // Animation
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // Z-index
  zIndex: {
    base: 1,
    drawer: 1000,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

export const useTheme = (): ThemeContextValue => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    ...theme,
    colors: theme.colors[isDark ? "dark" : "light"],
    isDark,
  };
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeContext = useTheme();

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
      <ToastMessage />
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
