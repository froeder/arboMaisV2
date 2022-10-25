import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Colors } from "../config";
import AddScreen from "../screens/AddScreen";
import TreeViewScreen from "../screens/TreeViewScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { AboutScreen } from "../screens/AboutScreen";
import DataScreen from "../screens/DataScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomePages({ navigation, user }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Visualizar Árvore"
        component={TreeViewScreen}
      />
    </Stack.Navigator>
  );
}

export default function AppStack({ navigation, user }) {
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
      <Drawer.Screen name="Início" component={HomePages} />
      <Drawer.Screen name="Adicionar" component={AddScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Usuários" component={ProfileScreen} />
      <Drawer.Screen name="Dados" component={DataScreen} />
      <Drawer.Screen name="Sobre" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
