import React from "react";
import { StyleSheet, Text } from "react-native";
import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { signOut } from "firebase/auth";
//Import styles
import styles from "./Styles";

import { auth } from "../config";

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <View isSafe={true} style={styles.container}>
      <Text>Árvores</Text>
      <Button title={"Sair"} style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </Button>
    </View>
  );
};
