import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens";
import { Colors } from "../config";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ navigation, user }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color = Colors.primary, size }) => {
          let iconName;
          color = focused ? Colors.primary : Colors.mediumGray;
          if (route.name === "Início") {
            iconName = "ios-home";
          } else if (route.name === "Perfil") {
            iconName = "ios-person";
          } else if (route.name === "Adicionar") {
            iconName = "ios-add-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={HomePages} />
      <Tab.Screen name="Adicionar" component={HomePages} />
      <Tab.Screen name="Perfil" component={HomePages} />
    </Tab.Navigator>
  );
}

function HomePages({ navigation, user }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTintColor: Colors.primary,
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Início" component={Home} />
    </Stack.Navigator>
  );
}

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Início">
      <Stack.Screen name="Início" component={Home} />
    </Stack.Navigator>
  );
};
