import { fetchData } from "@/lib/api";
import { Alias, DevelopmentEvent, Project, ReadyState } from "@/types";
import {
  CircularProgress,
  Host,
  LabeledContent,
  List,
  Section,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const fetchProjectById = async (id: string) => {
  return fetchData(`/v9/projects/${id}`);
};

const ProjectDetail = () => {
  const params = useLocalSearchParams();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  const projectName = Array.isArray(params.projectName)
    ? params.projectName[0]
    : params.projectName;

  const {
    data: project,
    error,
    isLoading,
  } = useQuery<Project>({
    queryKey: ["project_detail"],
    queryFn: () => fetchProjectById(projectId),
  });

  const production = project?.targets.production;

  if (error instanceof Error) {
    return (
      <Host style={{ flex: 1 }}>
        <Text color="red">{error.message}</Text>
      </Host>
    );
  }

  const getReadyStateString = (state: ReadyState) => {
    switch (state) {
      case "BUILDING":
        return "Building";
      case "ERROR":
        return "Error";
      case "INITIALIZING":
        return "Iniializing";
      case "QUEUED":
        return "Queued";
      case "READY":
        return "Ready";
      case "CANCELED":
        return "Canceled";
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: Platform.OS === "ios" ? projectName : "",
          headerLargeTitle: true,
          headerBackTitle: "Overview",
        }}
      />
      {
        <Host style={{ flex: 1 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <List>
              {production && (
                <Section title="Production Deployment">
                  <LabeledContent label="Status">
                    <Text>{getReadyStateString(production.readyState)}</Text>
                  </LabeledContent>
                  {project?.framework && (
                    <LabeledContent label="Framework">
                      <Text>{project.framework}</Text>
                    </LabeledContent>
                  )}
                  <LabeledContent label="Deployment">
                    <Text>{production.deploymentHostname}</Text>
                  </LabeledContent>
                  <LabeledContent label="Created">
                    <Text>{`${new Date(
                      production.createdAt
                    ).toLocaleDateString()} by ${
                      production.creator.username
                    }`}</Text>
                  </LabeledContent>
                  <LabeledContent label="Source">
                    <Text weight="semibold">
                      {production.meta.githubCommitRef}
                    </Text>
                    <Text>{`(${production.meta.githubCommitSha.slice(0, 7)}) ${
                      production.meta.githubCommitMessage
                    }`}</Text>
                  </LabeledContent>
                </Section>
              )}
              {production && (
                <AssigningCustomDomains deploymentId={production.id} />
              )}
              {production && <BuildLogsSection deploymentId={production.id} />}
            </List>
          )}
        </Host>
      }
    </>
  );
};

const AssigningCustomDomains = ({ deploymentId }: { deploymentId: string }) => {
  const fetchDeploymentAliases = async () => {
    return fetchData(`/v2/deployments/${deploymentId}/aliases`);
  };

  const { data, error, isLoading } = useQuery<{ aliases: Alias[] }>({
    queryKey: ["deployment_aliases"],
    queryFn: () => fetchDeploymentAliases(),
  });

  return (
    <Section title="Assigning Custom Domain">
      {data?.aliases.map((alias) => (
        <Text key={alias.uid}>{alias.alias}</Text>
      ))}
    </Section>
  );
};

const BuildLogsSection = ({ deploymentId }: { deploymentId: string }) => {
  const fetchBuildLogs = async () => {
    return fetchData(`/v3/deployments/${deploymentId}/events`);
  };

  const {
    data: logs,
    error,
    isLoading,
  } = useQuery<DevelopmentEvent[]>({
    queryKey: ["build_logs"],
    queryFn: () => fetchBuildLogs(),
  });

  if (error instanceof Error) {
    return (
      <Section title="Build Logs">
        <Text color="red">{error.message}</Text>
      </Section>
    );
  }

  return (
    <Section title="Build Logs">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <VStack alignment="leading">
          {logs?.map((log) => {
            return (
              <Text key={log.id} size={12}>
                {`${new Date(
                  log.created
                ).toLocaleTimeString()} ${log.text.trim()}`}
              </Text>
            );
          })}
        </VStack>
      )}
    </Section>
  );
};

export default ProjectDetail;
