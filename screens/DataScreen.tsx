import React from "react";
import { Text } from "react-native";
import { View } from "../components";
//Import styles
import styles from "./Styles";
import { NavigationProp } from "@react-navigation/core";

export default class DataScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View isSafe={false} style={styles.container}>
        <Text>Dado offline</Text>
      </View>
    );
  }
}

type State = {};

type Props = {
  navigation: NavigationProp<null>;
};
