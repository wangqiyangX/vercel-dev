import React from "react";

import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="overview">
        <Icon sf={{ default: "tray.full", selected: "tray.full.fill" }} />
        <Label selectedStyle={{}}>Overview</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="deployments">
        <Icon sf={"calendar.day.timeline.leading"} />
        <Label selectedStyle={{}}>Deployments</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="domains">
        <Icon sf={"link"} />
        <Label selectedStyle={{}}>Domains</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
