import { fetchData } from "@/lib/api";
import {
  GetDomainsResponseBody,
  GetTeamsResponseBody,
  GetUserResponseBody,
  Membership,
} from "@/types";
import {
  Host,
  HStack,
  LabeledContent,
  List,
  Section,
  Spacer,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const TeamsSection = () => {
  const fetchTeams = async () => {
    return fetchData("/v2/teams");
  };
  const { data, error, isLoading } = useQuery<GetTeamsResponseBody>({
    queryKey: ["Teams"],
    queryFn: fetchTeams,
  });

  const getRoleString = (membership: Membership) => {
    switch (membership.role) {
      case "OWNER":
        return "Owner";
      case "MEMBER":
        return "Member";
      case "DEVELOPER":
        return "Developer";
      case "SECURITY":
        return "Security";
      case "BILLING":
        return "Billing";
      case "VIEWER":
        return "Viewer";
      case "VIEWER_FOR_PLUS":
        return "Viewer for plus";
      case "CONTRIBUTOR":
        return "contributor";
    }
  };

  const teams = data?.teams;

  return (
    <Section title="Teams">
      {teams?.map((team) => {
        return (
          <HStack key={team.id} spacing={12}>
            {/* <Image
              source={{
                uri: "https://vercel.com/api/www/avatar?s=64&teamId=team_T8Ppeqq5CQEdXYJK8WX86XYc",
              }}
              style={{
                width: 64,
                height: 64,
              }}
              contentFit="contain"
            /> */}
            <VStack alignment="leading">
              <Text>{team.name}</Text>
              <Text size={12} color="secondary">
                {getRoleString(team.membership)}
              </Text>
            </VStack>
            <Spacer />
            <Text color="secondary">{team.billing.plan}</Text>
          </HStack>
        );
      })}
    </Section>
  );
};

const DomainsSection = () => {
  const fetchDomains = async () => {
    return fetchData("/v5/domains");
  };
  const { data, error, isLoading } = useQuery<GetDomainsResponseBody>({
    queryKey: ["domains"],
    queryFn: fetchDomains,
  });
  const domains = data?.domains;

  return (
    <Section title="Domains">
      {domains && domains.length > 0 ? (
        domains.map((domain) => {
          return <Text key={domain.id}>{domain.name}</Text>;
        })
      ) : (
        <Text>No Domains</Text>
      )}
    </Section>
  );
};

const AccountSection = () => {
  const fetchUser = async () => {
    return fetchData("/v2/user");
  };

  const { data, error, isLoading } = useQuery<GetUserResponseBody>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const user = data?.user;

  return (
    <Section title="Account">
      <LabeledContent label="User ID">
        <Text>{user?.id ?? ""}</Text>
      </LabeledContent>
      <LabeledContent label="Display Name">
        <Text>{user?.name ?? ""}</Text>
      </LabeledContent>
      <LabeledContent label="Username">
        <Text>{`vercel.com/${user?.username ?? ""}`}</Text>
      </LabeledContent>
      <LabeledContent label="Email">
        <Text>{user?.email ?? ""}</Text>
      </LabeledContent>
      <LabeledContent label="Default Team">
        <Text>{user?.defaultTeamId ?? ""}</Text>
      </LabeledContent>
    </Section>
  );
};

export default function UserPage() {
  return (
    <Host style={{ flex: 1 }}>
      <List>
        <TeamsSection />
        <AccountSection />
        <DomainsSection />
      </List>
    </Host>
  );
}
