import { fetchData } from "@/lib/api";
import { Project } from "@/types";
import {
  CircularProgress,
  Host,
  HStack,
  List,
  Spacer,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";

const fetchProjects = async () => {
  return fetchData("/v10/projects");
};

export default function OverviewPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["overview", "projects"],
    queryFn: fetchProjects,
  });
  const projects: Project[] = data?.projects;

  if (isLoading) {
    return (
      <Host style={{ flex: 1 }}>
        <CircularProgress />
      </Host>
    );
  }

  if (error instanceof Error) {
    return (
      <Host style={{ flex: 1 }}>
        <Text color="red">{error.message}</Text>
      </Host>
    );
  }

  return (
    <Host style={{ flex: 1 }}>
      <List>
        {projects?.map((proj) => {
          const projectLatestDeployment = proj.latestDeployments[0];

          return (
            <Link
              key={proj.id}
              href={{
                pathname: "/project/[projectId]",
                params: { projectId: proj.id, projectName: proj.name },
              }}
              asChild
            >
              <VStack alignment="leading" spacing={8}>
                <HStack alignment="top">
                  <Text weight="semibold">{proj.name}</Text>
                  <Spacer />
                  <Text size={12} color="secondary" modifiers={[]}>
                    {proj.targets.production?.alias[0]}
                  </Text>
                </HStack>
                <Text size={12} lineLimit={2}>
                  {projectLatestDeployment?.meta.githubCommitMessage
                    ? projectLatestDeployment.meta.githubCommitMessage
                    : "No Deployment"}
                </Text>
                <HStack>
                  <Text size={12} color="secondary">
                    {`${new Date(
                      projectLatestDeployment?.createdAt
                    ).toDateString()} on ${
                      projectLatestDeployment?.meta.githubCommitRef ?? ""
                    }`}
                  </Text>
                  <Spacer />
                  {projectLatestDeployment?.meta.githubCommitOrg &&
                    projectLatestDeployment?.meta.githubRepo && (
                      <Text size={12} color="secondary">
                        {`${
                          projectLatestDeployment?.meta.githubCommitOrg ?? ""
                        }/${projectLatestDeployment?.meta.githubRepo ?? ""}`}
                      </Text>
                    )}
                </HStack>
              </VStack>
            </Link>
          );
        })}
      </List>
    </Host>
  );
}
