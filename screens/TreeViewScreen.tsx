import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { Button, LoadingIndicator, View } from "../components";
import styles from "./Styles";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { getPhoto, downloadPhotosUrl } from "../services/FirebaseService";
import { Trees } from "../utils/Types";
import { formatedDate } from "../utils/Functions";
import { ViewItemTree } from "../components/ViewItemTree";
import { FlatList } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

export default class TreeViewScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tree: this.props.route.params.tree,
      arvore1_url: "",
      arvore2_url: "",
      arvore3_url: "",
      images: [],
      loading: true,
    };
  }

  getPhotoUrl = async (id, arvore) => {
    const photoUrl = await getPhoto(id, arvore);
    return photoUrl;
  };

  saveFile = async (fileUri: string) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("ArboMais", asset, false).then(() => {
        alert("Imagem salva com sucesso!");
      });
    }
  };

  pressDownload = async () => {
    const id = this.state.tree.id;
    this.donwloadPhotos(id, "arvore1");
    //this.donwloadPhotos(id, "arvore2");
    //this.donwloadPhotos(id, "arvore3");
  };

  donwloadPhotos = async (id, arvore) => {
    //const url = await downloadPhotos(id, arvore);
    console.log(id);
    return;

    let fileUri = FileSystem.documentDirectory + "image1.jpeg";
    FileSystem.downloadAsync(url, fileUri)
      .then(({ uri }) => {
        this.saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async componentDidMount() {
    const id = this.state.tree.primeira_foto;
    const arvore1_url = await this.getPhotoUrl(id, "arvore1");
    const arvore2_url = await this.getPhotoUrl(id, "arvore2");
    const arvore3_url = await this.getPhotoUrl(id, "arvore3");
    if (arvore1_url) {
      this.setState({
        images: [arvore1_url, arvore2_url, arvore3_url],
        loading: false,
      });
    } else this.setState({ loading: false });
  }

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          {!this.state.loading ? (
            <FlatList
              horizontal={true}
              data={this.state.images}
              renderItem={({ item }) => (
                <Image style={styles.images_carousel} source={{ uri: item }} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <LoadingIndicator />
          )}

          <View isSafe={false} style={{}}>
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
              <ViewItemTree
                title="Setor:"
                description={this.state.tree.setor}
              />
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
                title="Distância da rua (m):"
                description={this.state.tree.rua ?? "Não informado"}
              />
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
                title="Intensidade:"
                description={this.state.tree.intensidade}
              />
            </View>
            <View isSafe={false} style={styles.column}>
              <ViewItemTree
                title="Local do ataque:"
                description={this.state.tree.local_ataque}
              />
              <View isSafe={false} style={styles.section_values}>
                <Text style={styles.bold}>Local do ataque: </Text>
                {this.state.tree.local_ataque.map((item) => (
                  <Text style={styles.identification_text}>{item}</Text>
                ))}
              </View>
              <ViewItemTree
                title="Injúrias:"
                description={this.state.tree.injurias}
              />
            </View>
            <View isSafe={false} style={styles.column}>
              <View isSafe={false} style={styles.section_values}>
                <Text style={styles.bold}>Ecologia </Text>
                {this.state.tree.ecologia.map((item) => (
                  <Text style={styles.identification_text}>{item}</Text>
                ))}
              </View>
              <View isSafe={false} style={styles.section_values}>
                <Text style={styles.bold}>Fenologia </Text>
                {this.state.tree.fenologia.map((item) => (
                  <Text style={styles.identification_text}>{item}</Text>
                ))}
              </View>
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
            </View>
            <View isSafe={false} style={styles.column}>
              <ViewItemTree
                title="Pavimento:"
                description={this.state.tree.pavimento}
              />
              <ViewItemTree
                title="Afloramento de raiz:"
                description={this.state.tree.afloram_raiz}
              />
            </View>
            <View isSafe={false} style={styles.column}>
              <ViewItemTree
                title="Participação na paisagem:"
                description={this.state.tree.participacao}
              />
              <ViewItemTree
                title="Fiação:"
                description={this.state.tree.fiacao ?? "Inexistente"}
              />
            </View>
            <View isSafe={false} style={styles.column}>
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
              <ViewItemTree
                title="Recuo:"
                description={this.state.tree.recuo}
              />
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
            <Text style={styles.identification_section}>
              Definição de Ações
            </Text>
            <View isSafe={false} style={styles.column}>
              <View isSafe={false} style={styles.section_values}>
                <Text style={styles.bold}>Ação Executada </Text>
                {this.state.tree.acao_executada.map((item) => (
                  <Text style={styles.identification_text}>{item}</Text>
                ))}
              </View>

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
        <View isSafe={false} style={styles.footer_tree}>
          <Button
            title="download"
            style={styles.button_footer_tree}
            onPress={this.donwloadPhotos}
          >
            <Text style={styles.button_footer_tree_text}>Baixar Fotos</Text>
          </Button>
          <Button title="edit" style={styles.button_footer_tree} onPress={{}}>
            <Text style={styles.button_footer_tree_text}>Editar Árvore</Text>
          </Button>
        </View>
      </>
    );
  }
}

type State = {
  tree: Trees;
  arvore1_url: string;
  arvore2_url: string;
  arvore3_url: string;
  images: Array<string>;
  loading: boolean;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
