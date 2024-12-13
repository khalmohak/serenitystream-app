import { useAuth } from "@/src/contexts/AuthContext";
import { Slot, Tabs } from "expo-router";

export default function TabsLayout() {
  const { user } = useAuth();
  <Tabs>
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        // You can add icons here
      }}
    />

    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        // You can add icons here
      }}
    />
  </Tabs>;
}
