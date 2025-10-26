import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import React from "react";
import { Platform, useColorScheme } from "react-native";

export function useThemeColor<T, U>(props: { light: T; dark: U }) {
  const theme = useColorScheme() ?? "light";
  // const theme = "dark";
  return props[theme];
}

export default function OverviewLayout() {
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
          title: Platform.OS === "ios" ? "Overview" : "",
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
