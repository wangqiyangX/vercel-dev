import { fetchData } from "@/lib/api";
import { GetDeploymentsResponseBody } from "@/types";
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

export default function DeploymentsPage() {
  const fetchDeployments = async () => {
    return fetchData("/v6/deployments");
  };

  const { data, error, isLoading } = useQuery<GetDeploymentsResponseBody>({
    queryKey: ["deployments"],
    queryFn: fetchDeployments,
  });
  const deployments = data?.deployments;

  return (
    <Host style={{ flex: 1 }}>
      <List
        scrollEnabled={true}
        onSelectionChange={(items) =>
          alert(`indexes of selected items: ${items.join(", ")}`)
        }
        listStyle="automatic"
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {deployments?.map((deployment) => {
              return (
                <Link
                  key={deployment.uid}
                  href={{
                    pathname: "/deployment/[deploymentId]",
                    params: { deploymentId: deployment.uid },
                  }}
                  asChild
                >
                  <HStack key={deployment.uid}>
                    <VStack alignment="leading">
                      <Text>{deployment.uid.slice(4, 13)}</Text>
                      {deployment.target && (
                        <Text size={12} color="secondary">
                          {deployment.target}
                        </Text>
                      )}
                    </VStack>
                    <Spacer />
                    <VStack alignment="trailing">
                      <Text color="secondary">{deployment.name}</Text>
                      <Text size={12} color="secondary">
                        {`${new Date(
                          deployment.createdAt
                        ).toLocaleTimeString()}-${new Date(
                          deployment.ready
                        ).toLocaleTimeString()}`}
                      </Text>
                      {/* <Text
                      size={12}
                      color="secondary"
                    >{`by ${deployment.creator.username}`}</Text> */}
                    </VStack>
                  </HStack>
                </Link>
              );
            })}
          </>
        )}
      </List>
    </Host>
  );
}
