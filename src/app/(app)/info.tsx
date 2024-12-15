import { Text } from "@/src/components/base/CustomText";
import { Layout } from "@/src/components/base/Layout";
import { Slot } from "expo-router";

export default function InfoScreen() {
  return (
    <Layout>
      <Text>App Info</Text>
    </Layout>
  );
}
