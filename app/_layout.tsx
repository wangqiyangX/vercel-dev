import { useColorScheme } from "@/hooks/use-color-scheme";
import { getValueFor } from "@/lib/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const isTokenValid = async () => {
    return await getValueFor("Token");
  };

  useEffect(() => {
    (async () => {
      const valid = await isTokenValid();
      setIsLoggedIn(valid);
    })();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

        <Stack>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen
              name="index"
              options={{
                headerTransparent: Platform.OS === "ios" ? true : false,
                headerLargeTitle: true,
                title: "Vercel Dev",
                headerStyle: {
                  backgroundColor:
                    Platform.OS === "ios" ? "transparent" : "red",
                },
              }}
            />
          </Stack.Protected>

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
          <Stack.Screen
            name="deployment/[deploymentId]"
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
    </QueryClientProvider>
  );
}
