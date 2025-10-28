import { Host, List, Text } from "@expo/ui/swift-ui";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const DeploymentDetail = () => {
  const params = useLocalSearchParams();
  const deploymentId = Array.isArray(params.deploymentId)
    ? params.deploymentId[0]
    : params.deploymentId;
  return (
    <>
      <Stack.Screen
        options={{
          title: Platform.OS === "ios" ? deploymentId.slice(4, 13) : "",
          headerLargeTitle: true,
          headerBackTitle: "Deployments",
        }}
      />
      <Host style={{ flex: 1 }}>
        <List>
          <Text>Deployment Detail</Text>
        </List>
      </Host>
    </>
  );
};

export default DeploymentDetail;
