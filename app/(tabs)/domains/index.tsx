import {
  Circle,
  CircularProgress,
  Host,
  HStack,
  List,
  Section,
  Spacer,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { foregroundStyle, frame } from "@expo/ui/swift-ui/modifiers";
import React, { useEffect, useState } from "react";

export type Deployment = {
  uid: string;
  name: string;
  projectId: string;
  url: string;
  created: number;
  source: string;
  state:
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "QUEUED"
    | "READY"
    | "CANCELED"
    | "DELETED";
  readyState: string;
  readySubstate: string;
  type: string;
  creator: Creator;
  inspectorUrl: string;
  meta: Meta;
  target: string;
  aliasError: null;
  aliasAssigned: number;
  isRollbackCandidate: boolean;
  createdAt: number;
  buildingAt: number;
  ready: number;
  projectSettings: ProjectSettings;
};

export type Creator = {
  uid: string;
  email: string;
  username: string;
  githubLogin: string;
};

export type Meta = {
  githubCommitAuthorName: string;
  githubCommitAuthorEmail: string;
  githubCommitMessage: string;
  githubCommitOrg: string;
  githubCommitRef: string;
  githubCommitRepo: string;
  githubCommitSha: string;
  githubDeployment: string;
  githubOrg: string;
  githubRepo: string;
  githubRepoOwnerType: string;
  githubCommitRepoId: string;
  githubRepoId: string;
  githubRepoVisibility: string;
  githubHost: string;
  githubCommitAuthorLogin: string;
  repoPushedAt: string;
  branchAlias: string;
};

export type ProjectSettings = {
  commandForIgnoringBuildStep: null;
};

const baseURL = "https://api.vercel.com";

export default function DeploymentsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      };
      const response = await fetch(`${baseURL}/v6/deployments`, { headers });
      const data = await response.json();
      const deploymentsList: Deployment[] = data.deployments;
      setDeployments(deploymentsList);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <Host style={{ flex: 1 }}>
      <List
        scrollEnabled={true}
        onSelectionChange={(items) =>
          alert(`indexes of selected items: ${items.join(", ")}`)
        }
        listStyle="automatic"
      >
        <Section>
          {isLoading ? (
            <CircularProgress />
          ) : (
            deployments.map((deployment) => {
              return (
                <HStack key={deployment.uid}>
                  <VStack alignment="leading">
                    <Text>{deployment.uid.slice(4, 13)}</Text>
                    <HStack spacing={8}>
                      <Circle
                        modifiers={[
                          frame({ width: 8, height: 8 }),
                          foregroundStyle(
                            deployment.state === "READY" ? "#50e3c2" : "red"
                          ),
                        ]}
                      />
                      <Text size={16} color="secondary">
                        {deployment.state === "READY" ? "Ready" : ""}
                      </Text>
                    </HStack>
                  </VStack>
                  <Spacer />
                  <Text
                    color="secondary"
                    lineLimit={1}
                    modifiers={[frame({ width: 120, alignment: "trailing" })]}
                  >
                    {deployment.name}
                  </Text>
                </HStack>
              );
            })
          )}
        </Section>
      </List>
    </Host>
  );
}
