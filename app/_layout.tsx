import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="project/[projectId]"
          options={{
            headerTransparent: Platform.OS === "ios" ? true : false,
            headerLargeTitle: false,
            title: "",
            headerStyle: {
              backgroundColor: Platform.OS === "ios" ? "transparent" : "red",
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
