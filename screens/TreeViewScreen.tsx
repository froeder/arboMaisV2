import React from "react";
import { Image, Text } from "react-native";
import { View } from "../components";
//Import styles
import styles from "./Styles";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { getPhoto } from "../services/FirebaseService";

export default class TreeViewScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tree: this.props.route.params.tree,
      arvore1_url: "",
    };
  }

  async componentDidMount() {
    const arvore1_url = await getPhoto(
      this.state.tree.primeira_foto,
      "arvore1"
    );
    this.setState({
      arvore1_url: arvore1_url,
    });
  }

  render() {
    return (
      <View isSafe={false} style={styles.container}>
        {this.state.arvore1_url && (
          <Image
            style={styles.image_tree}
            source={{ uri: this.state.arvore1_url }}
          />
        )}
      </View>
    );
  }
}

type State = {
  tree: any;
  arvore1_url: string;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
