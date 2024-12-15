import React from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";
import { useAppTheme } from "@/src/constants/theme";
import { Drawer } from "expo-router/drawer";
import LoadingScreen from "@/src/components/base/Loading";

export default function AppLayout() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !isLoading) {
    return <Redirect href={"/login"} />;
  }

  const { colors } = useAppTheme();

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.surface,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textLight,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
      }}
    >
      <Drawer.Screen
        name="(tabs)/index"
        options={{
          drawerLabel: "Home",
          title: "overview",
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="info"
        options={{
          title: "Information",
          headerShown: false,
        }}
      />

      {/* Hidden from Sidebar */}
      <Drawer.Screen
        name="(tabs)/home"
        options={{
          drawerLabel: "Home",
          title: "overview",
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="(tabs)/profile"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="(tabs)/explore"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
