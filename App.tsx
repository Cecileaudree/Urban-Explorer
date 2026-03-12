import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DiscoverScreen from "./src/screens/DiscoverScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetailScreen";
import MapScreen from "./src/screens/MapScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import { DiscoverStackParamList, RootTabParamList } from "./src/types/navigation";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<DiscoverStackParamList>();

function DiscoverStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Découverte" component={DiscoverStackNavigator} />
        <Tab.Screen name="Carte" component={MapScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}