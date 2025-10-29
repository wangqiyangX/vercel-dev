import { fetchData } from "@/lib/api";
import { DelopmentPlus } from "@/types";
import {
  CircularProgress,
  Host,
  LabeledContent,
  List,
  Section,
  Text,
} from "@expo/ui/swift-ui";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const DeploymentDetail = () => {
  const params = useLocalSearchParams();
  const deploymentId = Array.isArray(params.deploymentId)
    ? params.deploymentId[0]
    : params.deploymentId;

  const fetchDeploymentDetail = () => {
    return fetchData(`/v13/deployments/${deploymentId}`);
  };

  const {
    data: deployment,
    error,
    isLoading,
  } = useQuery<DelopmentPlus>({
    queryKey: ["deployment_detail"],
    queryFn: fetchDeploymentDetail,
  });

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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {deployment && (
                <>
                  <Section title="Base">
                    <LabeledContent label="Name">
                      <Text>{deployment.name}</Text>
                    </LabeledContent>
                    <LabeledContent label="Role">
                      <Text>{deployment.public ? "Public" : "Private"}</Text>
                    </LabeledContent>
                    <LabeledContent label="Status">
                      <Text>{deployment.status}</Text>
                    </LabeledContent>
                    {deployment.ready && (
                      <LabeledContent label="Ready">
                        <Text>
                          {`at ${new Date(
                            deployment.ready
                          ).toLocaleTimeString()}`}
                        </Text>
                      </LabeledContent>
                    )}
                    <LabeledContent label="Target">
                      <Text>{deployment.target}</Text>
                    </LabeledContent>
                    <LabeledContent label="Project">
                      <Text>{deployment.projectId}</Text>
                    </LabeledContent>
                  </Section>
                  {deployment.meta.githubCommitMessage && (
                    <Section title="GitHub">
                      <Text>{deployment.meta.githubCommitMessage}</Text>
                    </Section>
                  )}

                  <Section title="Alias">
                    {deployment.alias.map((alias) => {
                      return <Text key={alias}>{alias}</Text>;
                    })}
                  </Section>
                </>
              )}
            </>
          )}
        </List>
      </Host>
    </>
  );
};

export default DeploymentDetail;
