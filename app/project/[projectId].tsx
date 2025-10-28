import { Project } from "@/types";
import {
  CircularProgress,
  Form,
  Host,
  LabeledContent,
  Section,
  Text,
} from "@expo/ui/swift-ui";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

const baseURL = "https://api.vercel.com";

const ProjectDetail = () => {
  const params = useLocalSearchParams();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  const projectName = Array.isArray(params.projectName)
    ? params.projectName[0]
    : params.projectName;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [project, setProject] = useState<Project>();

  const fetchProjectById = async (id: string) => {
    try {
      setIsLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      };
      const response = await fetch(`${baseURL}/v9/projects/${id}`, { headers });
      const project = await response.json();
      setProject(project);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectById(projectId);
  }, [projectId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: Platform.OS === "ios" ? projectName : "",
          headerLargeTitle: true,
          headerBackTitle: "Overview",
        }}
      />
      <Host style={{ flex: 1 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Form scrollEnabled={true}>
            <Section title="Info">
              <LabeledContent label="ID">
                <Text>{project?.id ?? ""}</Text>
              </LabeledContent>
            </Section>
          </Form>
        )}
      </Host>
    </>
  );
};

export default ProjectDetail;
