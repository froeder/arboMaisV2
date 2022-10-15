import React from "react";
import { StyleSheet, Text } from "react-native";
import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { signOut } from "firebase/auth";
//Import styles
import styles from "./Styles";
import { Trees } from "../utils/Types";

import { auth } from "../config";
import { getCollection } from "../services/FirebaseService";
import { NavigationProp } from "@react-navigation/core";
export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      trees: {},
    };
  }
  handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  getTrees = async () => {
    const trees = await getCollection("arvores");
    console.log(trees);
  };

  componentDidMount() {
    console.log("Teste");
    this.getTrees();
  }

  render() {
    return (
      <View isSafe={true} style={styles.container}>
        <Text>Árvores</Text>
      </View>
    );
  }
}

type State = {
  trees: any;
};

type Props = {
  navigation: NavigationProp<null>;
};
