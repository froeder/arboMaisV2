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

  componentDidMount() {
    this.getTrees();
  }

  renderFlatList = (data) => {
    console.log(data);
    return (
      <Pressable>
        <Text>{data.item.numero}</Text>
      </Pressable>
    );
  };

  render() {
    return (
      <View isSafe={true} style={styles.container}>
        <FlatList
          data={this.state.trees}
          keyExtractor={(item) => item.video_id}
          renderItem={this.renderFlatList}
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
