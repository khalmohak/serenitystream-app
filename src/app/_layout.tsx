import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThemeProvider } from "../constants/theme";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BrandonTextBold: require("../../assets/fonts/HvDTrial_Brandon_Text_Bold-BF6514e9eb720dc.otf"),
    BrandonTextMedium: require("../../assets/fonts/HvDTrial_Brandon_Text_Medium-BF6514e9eb272a3.otf"),
    BrandonTextRegular: require("../../assets/fonts/HvDTrial_Brandon_Text_Regular-BF6514e9eb617a0.otf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
