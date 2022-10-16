import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
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
    this.setState({ trees });
  };

  onPress = (item: Trees) => {
    console.log(item);
  };

  componentDidMount() {
    this.getTrees();
  }

  renderItem = ({ item }) => (
    <Pressable style={styles.trees} onPress={() => this.onPress(item)}>
      <Text style={styles.text_trees}>
        {item.numero} - {item.setor} - {item.nome_popular ?? "Sem nome popular"}{" "}
        - {item.falta_campos ? "Incompleto" : "Completo"} -{" "}
        {item.primeira_foto ? "Com foto" : "Sem foto"}
      </Text>
    </Pressable>
  );

  render() {
    return (
      <View isSafe={true} style={styles.container}>
        <FlatList
          data={this.state.trees}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
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
