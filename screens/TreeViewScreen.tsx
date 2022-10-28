import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { LoadingIndicator, View } from "../components";
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
        {this.state.arvore1_url ? (
          <Image
            style={styles.image_tree}
            source={{ uri: this.state.arvore1_url }}
          />
        ) : (
          <LoadingIndicator />
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
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Dados da Árvore</Text>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Nome Científico:</Text>
              <Text style={styles.identification_text}>
                {this.state.tree.nome_cientifico ?? "Não informado"}
              </Text>
            </View>
          </View>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Familía: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.familia ?? "Não informado"}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Gênero: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.genero ?? "Não informado"}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Espécie: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.especie ?? "Não informado"}
              </Text>
            </View>
          </View>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Circunferências</Text>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>C90 cm: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.c90 ?? "Não informado"}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>C130 cm: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.c130 ?? "Não informado"}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>C150 cm: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.c150 ?? "Não informado"}
              </Text>
            </View>
          </View>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Altura primeira ramificação: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.altura_primeira_ramificacao ?? "Não informado"}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Altura opção: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.altura_opcao ?? "Não informado"}
              </Text>
            </View>
          </View>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}> Distância da calçada: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.calcada ?? "Não informado"}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}> Distância da calçada: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.calcada ?? "Não informado"}
              </Text>
            </View>
          </View>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}> Arquitetura da copa: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.arq_copa ?? "Não informado"}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}> É palmeira: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.palmeira ?? "Não informado"}
              </Text>
            </View>
          </View>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Biologia</Text>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Estado geral:</Text>
              <Text style={styles.identification_text}>
                {this.state.tree.estado_geral}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Equilíbrio: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.equilibrio}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Equilíbrio geral: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.equilibrio_geral}
              </Text>
            </View>
          </View>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Fitossanidade: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.fito}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Injúrias: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.fito}
              </Text>
            </View>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Ecologia: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.ecologia}
              </Text>
            </View>
          </View>
          <View isSafe={false} style={styles.column}>
            <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>Fenologia: </Text>
              <Text style={styles.identification_text}>
                {this.state.tree.fenologia}
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
