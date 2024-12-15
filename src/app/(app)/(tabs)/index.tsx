import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppTheme } from "@/src/constants/theme";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
import Feather from "@expo/vector-icons/Feather";
import ExploreScreen from "./explore";

export default function Index() {
  const { colors, typography } = useAppTheme();

  const Tab = createBottomTabNavigator();

  const tabScreenOptions = {
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    tabBarStyle: {
      backgroundColor: colors.surface,
      borderTopColor: colors.border,
    },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.textLight,
  };

  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="/home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="home"
                size={24}
                color={focused ? colors.primary : colors.textLight}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="/explore"
        component={ExploreScreen}
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="search"
                size={24}
                color={focused ? colors.primary : colors.textLight}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="/profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="user"
                size={24}
                color={focused ? colors.primary : colors.textLight}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
