import React, { useContext } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import DiscoverScreen from "./src/screens/DiscoverScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetailScreen";
import MapScreen from "./src/screens/MapScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import {
  DiscoverStackParamList,
  RootTabParamList,
} from "./src/types/navigation";

import { ThemeProvider, ThemeContext } from "./src/context/ThemeContext";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<DiscoverStackParamList>();

function DiscoverStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ title: "Découverte" }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: "Détails du lieu" }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isDarkMode, colors } = useContext(ThemeContext);

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
    },
  };

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = "ellipse";

                if (route.name === "Découverte")
                  iconName = focused ? "compass" : "compass-outline";
                else if (route.name === "Carte")
                  iconName = focused ? "map" : "map-outline";
                else if (route.name === "Profil")
                  iconName = focused ? "person" : "person-outline";

                return <Ionicons name={iconName} size={size} color={color} />;
              },

              tabBarActiveTintColor: "#2563eb",
              tabBarInactiveTintColor: "gray",

              headerShown: false,
            })}
          >
            <Tab.Screen name="Découverte" component={DiscoverStackNavigator} />
            <Tab.Screen name="Carte" component={MapScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
