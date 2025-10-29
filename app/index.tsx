import { saveToken } from "@/lib/store";
import { Button, Form, Host, Section, TextField } from "@expo/ui/swift-ui";
import { router } from "expo-router";
import React, { useState } from "react";

export default function IndexPage() {
  const [token, setToken] = useState("");

  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <Section title="API Token">
          <TextField
            placeholder="Enter your token..."
            onChangeText={setToken}
          />
        </Section>
        <Button
          onPress={async () => {
            if (!token) return;
            await saveToken("Token", token);
            router.replace("/(tabs)/overview");
          }}
        >
          Sign In
        </Button>
      </Form>
    </Host>
  );
}
