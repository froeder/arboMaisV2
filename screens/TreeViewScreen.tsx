import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { View } from "../components";
//Import styles
import styles from "./Styles";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { getPhoto } from "../services/FirebaseService";
import { Trees } from "../utils/Types";
import { formatedDate } from "../utils/Functions";

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
      <ScrollView style={styles.container}>
        {this.state.arvore1_url && (
          <Image
            style={styles.image_tree}
            source={{ uri: this.state.arvore1_url }}
          />
        )}
        <View isSafe={false}>
          <Text style={styles.view_tree_title}>
            {this.state.tree.nome_cientifico}
          </Text>
          <Text style={styles.view_tree_subtitle}>
            {this.state.tree.nome_popular}
          </Text>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Identificação</Text>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>ID:</Text>
              <Text style={styles.identification_text}>
                {this.state.tree.numero}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Adicionada em: </Text>
              <Text style={styles.identification_text}>
                {formatedDate(this.state.tree.data_atual_enviada)}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Setor: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.setor}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

type State = {
  tree: Trees;
  arvore1_url: string;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
