import React from "react";
import { StyleSheet, Text } from "react-native";
import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { signOut } from "firebase/auth";
//Import styles
import styles from "./Styles";

import { auth } from "../config";

export const AddScreen = () => {
  return (
    <View isSafe={true} style={styles.container}>
      <Text>Adicioanr</Text>
    </View>
  );
};
