import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Colors } from "../config";
import { Ionicons } from "@expo/vector-icons";
import { AddScreen } from "../screens/AddScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomePages({ navigation, user }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: "#fff",
      }}
      initialRouteName="Início"
    >
      <Drawer.Screen name="Início" component={HomeScreen} />
      <Drawer.Screen name="Adicionar" component={AddScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
