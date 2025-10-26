import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useThemeColor } from "../overview/_layout";

export default function DeploymentsLayout() {
  const tabBarBackgroundColor = useThemeColor({
    light: "#FFFFFF",
    dark: "#000000",
  });
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: Platform.OS === "ios" ? "Deployments" : "",
          headerStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? "transparent"
              : tabBarBackgroundColor,
          },
        }}
      />
    </Stack>
  );
}
