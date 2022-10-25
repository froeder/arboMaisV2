import React from "react";
import { FlatList, Pressable, RefreshControl, Text } from "react-native";
import { View } from "../components";
import { signOut } from "firebase/auth";
import styles from "./Styles";

import { auth, Colors } from "../config";
import { getCollection } from "../services/FirebaseService";
import { NavigationProp } from "@react-navigation/core";
import SearchBar from "react-native-dynamic-search-bar";
import ButtonToggleGroup from "react-native-button-toggle-group";

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      trees: {},
      searchText: "",
      filter: "Tudo",
      loading: true,
    };
  }

  handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  /**
   *
   * @param order
   * @param direction
   */
  getTrees = async (order, direction) => {
    const trees = await getCollection("arvores", order, direction);
    this.setState({ trees: trees, loading: false });
  };

  /**
   *
   * @param item
   */
  onPress = (item: any) => {
    this.props.navigation.navigate("Visualizar Árvore", { tree: item });
  };

  onPressSearchClear = () => {
    this.filterList("");
    this.setState({ searchText: "" });
    this.getTrees("numero", "asc");
  };

  /**
   *
   * @param text
   */
  onChangeTextSearch(text) {
    this.filterList(text);
    this.setState({ searchText: text });
  }

  /**
   *
   * @param val
   */
  onSelectButton(val) {
    this.setLoadingState(true);
    this.filterButtonGroup(val);
    this.setState({ filter: val });
  }

  /**
   *
   * @param date
   * @returns
   */
  formatedDate(date: string) {
    let data = date.split("-");
    let day = data[0];
    let month = data[1];
    let year = date.split("-")[2].split("T")[0];
    let formated_date = day + "/" + month + "/" + year;
    return formated_date;
  }

  /**
   *
   * @param loading
   */
  setLoadingState = (loading: boolean) => {
    this.setState({ loading: loading });
  };

  filteHasComplete = async () => {
    await this.getTrees("numero", "asc");

    const newData = this.state.trees.filter((item) => {
      return item.falta_campos === "Sim";
    });

    this.setState({ trees: newData, loading: false });
  };

  filterHasPhoto = async () => {
    await this.getTrees("numero", "asc");

    const newData = this.state.trees.filter((item) => {
      if (typeof item.primeira_foto !== "string") return item;
    });

    this.setState({ trees: newData, loading: false });
  };

  /**
   *
   * @param val
   */
  filterButtonGroup(val: string) {
    if (val == "Incompleto") {
      this.getTrees("numero", "asc");
      this.filteHasComplete();
    } else if (val == "Sem Foto") {
      this.filterHasPhoto();
    } else if (val == "Recentes") {
      this.getTrees("numero", "desc");
    } else {
      this.getTrees("numero", "asc");
    }
  }

  /**
   *
   * @param text
   * @returns
   */
  filterList = (text: string) => {
    this.setLoadingState(true);
    if (text === "") {
      this.getTrees("numero", "asc");
      return;
    }
    const newData = this.state.trees.filter((item) => {
      if (!item.nome_popular) return false;
      const itemData = item.nome_popular.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ trees: newData, loading: false });
  };

  componentDidMount() {
    this.getTrees("numero", "asc");
  }

  renderItem = ({ item }) => (
    <Pressable style={styles.trees_item} onPress={() => this.onPress(item)}>
      <View isSafe={false} style={styles.tree_name}>
        <Text style={styles.title_item_tree}>
          {item.numero} - {item.nome_popular ?? "Sem nome popular"} /
        </Text>
        <Text style={styles.tree_specie}> {item.especie ?? "Sem espécie"}</Text>
      </View>
      <View isSafe={false} style={styles.tree_date}>
        <Text style={styles.text_trees}>
          {item.setor} -{" "}
          {item.falta_campos == "Não" ? "Completo" : "Incompleto"} -{" "}
          {item.primeira_foto ? "Com foto" : "Sem foto"}
        </Text>
        <Text style={styles.tree_date_add}>
          {this.formatedDate(item.data_atual_enviada)}
        </Text>
      </View>
    </Pressable>
  );

  render() {
    return (
      <View isSafe={false} style={styles.container}>
        <SearchBar
          style={styles.search_bar}
          placeholder="Buscar"
          placeholderTextColor="#FFFFFF"
          clearIconImageStyle={{ tintColor: "#FFFFFF" }}
          searchIconImageStyle={{ tintColor: "#FFFFFF" }}
          onChangeText={(text) => {
            this.onChangeTextSearch(text);
          }}
          onPress={() => this.filterList(this.state.searchText)}
          onSearchPress={() => this.filterList(this.state.searchText)}
          onClearPress={this.onPressSearchClear}
        />
        <ButtonToggleGroup
          style={styles.button_toggle_group}
          textStyle={{ fontSize: 10 }}
          highlightBackgroundColor={Colors.primary}
          highlightTextColor={"white"}
          inactiveBackgroundColor={"transparent"}
          inactiveTextColor={"grey"}
          values={["Tudo", "Incompleto", "Sem Foto", "Recentes"]}
          value={this.state.filter}
          onSelect={(val) => {
            this.onSelectButton(val);
          }}
        />
        <FlatList
          data={this.state.trees}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.getTrees("numero", "asc")}
            />
          }
        />
      </View>
    );
  }
}

type State = {
  trees: any;
  searchText: string;
  filter: string;
  loading: boolean;
};

type Props = {
  navigation: NavigationProp<any>;
};
