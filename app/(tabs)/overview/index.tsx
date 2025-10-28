import {
  CircularProgress,
  Host,
  List,
  Section,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";

const baseURL = "https://api.vercel.com";

type Project = {
  name: string;
  id: string;
  accountId: string;
  targets: {
    production: {
      id: string;
      alias: string[];
      meta: {
        githubCommitAuthorName: string;
        githubCommitAuthorEmail: string;
        githubCommitMessage: string;
        githubCommitOrg: string;
        githubCommitRepo: string;
        githubCommitRef: string;
        githubCommitSha: string;
      };
    };
  };
};

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      };
      const response = await fetch(`${baseURL}/v10/projects`, { headers });
      const data = await response.json();
      const projectsList: Project[] = data.projects;
      setProjects(projectsList);
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List
          scrollEnabled={true}
          onSelectionChange={(items) =>
            alert(`indexes of selected items: ${items.join(", ")}`)
          }
          listStyle="automatic"
        >
          <Section title="Projects">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href={{
                  pathname: "/project/[projectId]",
                  params: { projectId: proj.id, projectName: proj.name },
                }}
                asChild
              >
                <VStack alignment="leading">
                  <Text>{proj.name}</Text>
                </VStack>
              </Link>
            ))}
          </Section>
        </List>
      )}
    </Host>
  );
}
