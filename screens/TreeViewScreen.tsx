import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { LoadingIndicator, View } from "../components";
import styles from "./Styles";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { getPhoto } from "../services/FirebaseService";
import { Trees } from "../utils/Types";
import { formatedDate } from "../utils/Functions";
import { ViewItemTree } from "../components/ViewItemTree";

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
            <ViewItemTree title="ID:" description={this.state.tree.numero} />
            <ViewItemTree
              title="Adicionada em:"
              description={formatedDate(this.state.tree.data_atual_enviada)}
            />
            <ViewItemTree title="Setor:" description={this.state.tree.setor} />
          </View>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Dados da Árvore</Text>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Nome Científico:"
              description={this.state.tree.nome_cientifico ?? "Não informado"}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Familía:"
              description={this.state.tree.familia ?? "Não informado"}
            />
            <ViewItemTree
              title="Gênero:"
              description={this.state.tree.genero ?? "Não informado"}
            />
            <ViewItemTree
              title="Espécie:"
              description={this.state.tree.especie ?? "Não informado"}
            />
          </View>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Circunferências</Text>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="C90 cm:"
              description={this.state.tree.c90 ?? "Não informado"}
            />
            <ViewItemTree
              title="C130 cm:"
              description={this.state.tree.c130 ?? "Não informado"}
            />
            <ViewItemTree
              title="C150 cm:"
              description={this.state.tree.c150 ?? "Não informado"}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Altura primeira ramificação:"
              description={
                this.state.tree.altura_primeira_ramificacao ?? "Não informado"
              }
            />
            <ViewItemTree
              title="Altura opção:"
              description={this.state.tree.altura_opcao ?? "Não informado"}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Distância da calçada (m):"
              description={this.state.tree.calcada ?? "Não informado"}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Arquitetura da copa:"
              description={this.state.tree.arq_copa ?? "Não informado"}
            />
            <ViewItemTree
              title="É palmeira:"
              description={this.state.tree.palmeira ?? "Não informado"}
            />
          </View>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Biologia</Text>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Estado geral:"
              description={this.state.tree.estado_geral}
            />
            <ViewItemTree
              title="Equilíbrio:"
              description={this.state.tree.equilibrio}
            />
            <ViewItemTree
              title="Equilíbrio geral:"
              description={this.state.tree.equilibrio_geral}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Fitossanidade:"
              description={this.state.tree.fito}
            />
            <ViewItemTree
              title="Injúrias:"
              description={this.state.tree.fito}
            />
            <ViewItemTree
              title="Ecologia:"
              description={this.state.tree.ecologia}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Fenologia:"
              description={this.state.tree.fenologia}
            />
          </View>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>
            Entorno e Inteferências
          </Text>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Local Geral:"
              description={this.state.tree.local_geral}
            />
            <ViewItemTree
              title="Localização Relativa:"
              description={this.state.tree.localizacao_relativa}
            />
            <ViewItemTree
              title="Pavimento:"
              description={this.state.tree.pavimento}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Afloramento de raiz:"
              description={this.state.tree.afloram_raiz}
            />
            <ViewItemTree
              title="Participação na paisagem:"
              description={this.state.tree.participacao}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Fiação:"
              description={this.state.tree.fiacao ?? "Inexistente"}
            />
            <ViewItemTree
              title="Posteamento:"
              description={this.state.tree.posteamento}
            />
            <ViewItemTree
              title="Iluminação:"
              description={this.state.tree.iluminacao}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Placas:"
              description={this.state.tree.sinalizacao}
            />
            <ViewItemTree
              title="Tráfego de Veículos:"
              description={this.state.tree.trafego_veiculos}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Tráfego de Pedestres:"
              description={this.state.tree.trafego_pedestres}
            />
            <ViewItemTree title="Recuo:" description={this.state.tree.recuo} />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Manilha:"
              description={this.state.tree.manilha}
            />
            <ViewItemTree
              title="Colo pavimentado"
              description={this.state.tree.colo_pavimentado}
            />
            <ViewItemTree
              title="Muro/Construção"
              description={this.state.tree.muro_construcao}
            />
          </View>
        </View>
        <View isSafe={false} style={{}}>
          <Text style={styles.identification_section}>Definição de Ações</Text>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Ação Executada:"
              description={this.state.tree.fenologia}
            />
            <ViewItemTree
              title="Qualidade da Ação:"
              description={this.state.tree.qualidade_acao}
            />
          </View>
          <View isSafe={false} style={styles.column}>
            <ViewItemTree
              title="Ação Recomendada:"
              description={this.state.tree.acao_recomendada}
            />
            <ViewItemTree
              title="Observações Gerais:"
              description={this.state.tree.observacoes_gerais}
            />
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
