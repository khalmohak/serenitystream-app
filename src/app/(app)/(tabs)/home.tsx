import { Button } from "@/src/components/base/Button";
import { Text } from "@/src/components/base/CustomText";
import { Layout } from "@/src/components/base/Layout";
import { Slot, router } from "expo-router";

export default function HomeScreen() {
  return (
    <Layout>
      <Text>Home</Text>
      <Button
        onPress={() => {
          router.push("/register");
        }}
      >
        Go to Registration
      </Button>
    </Layout>
  );
}
