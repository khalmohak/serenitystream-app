import { Button } from "@/src/components/base/Button";
import { Text } from "@/src/components/base/CustomText";
import { Layout } from "@/src/components/base/Layout";
import { useAuth } from "@/src/contexts/AuthContext";
import { Slot } from "expo-router";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <Layout
      style={{
        gap: 10,
        marginTop: 20,
      }}
    >
      <Text>
        Hi, {user?.firstName} {user?.lastName}
      </Text>
      <Button onPress={signOut}>Logout</Button>
    </Layout>
  );
}
