import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThemeProvider } from "../constants/theme";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import LoadingScreen from "../components/base/Loading";

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

  return <ThemeProvider>
    <AuthProvider>
      <RootLayoutNav />
      {/* <Slot/> */}
    </AuthProvider>
  </ThemeProvider>;
}

function RootLayoutNav() {
  const { isAuthenticated , isLoading} = useAuth();
  
  if(isLoading){
    return <LoadingScreen/>
  }

  if (!isAuthenticated) {
    //Auth Stack 
    return <Redirect href="/login" />;
  }

  //Home stack/protected stack
  return <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  
  return (
    <Stack>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="auth/login/index" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
