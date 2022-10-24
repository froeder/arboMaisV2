import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { signOut } from "firebase/auth";
//Import styles
import styles from "./Styles";
import { Trees } from "../utils/Types";

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
    this.props.navigation.navigate("Visualizar Árvore", { tree: item });
  };

  formatedDate(date: string) {
    let data = date.split("-");
    let day = data[0];
    let month = data[1];
    let year = date.split("-")[2].split("T")[0];
    let formated_date = day + "/" + month + "/" + year;
    return formated_date;
  }

  filteHasComplete = () => {
    const newData = this.state.trees.filter((item) => {
      return item.falta_campos === "Sim";
    });

    this.setState({ trees: newData });
  };

  filterHasPhoto = () => {
    const newData = this.state.trees.filter((item) => {
      if (typeof item.primeira_foto !== "string") return item;
    });

    this.setState({ trees: newData });
  };

  filterButtonGroup(val) {
    if (val == "Incompleto") {
      this.filteHasComplete();
    } else if (val == "Sem Foto") {
      this.filterHasPhoto();
    } else {
      this.getTrees();
    }
  }

  filterList = (text: string) => {
    if (text === "") {
      this.getTrees();
      return;
    }
    const newData = this.state.trees.filter((item) => {
      if (!item.nome_popular) return false;
      const itemData = item.nome_popular.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ trees: newData });
  };

  componentDidMount() {
    this.getTrees();
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
            this.setState({ searchText: text });
            this.filterList(text);
          }}
          onPress={() => this.filterList(this.state.searchText)}
          onSearchPress={() => this.filterList(this.state.searchText)}
          onClearPress={() => {
            this.filterList("");
            this.getTrees();
          }}
        />
        <ButtonToggleGroup
          style={styles.button_toggle_group}
          highlightBackgroundColor={Colors.primary}
          highlightTextColor={"white"}
          inactiveBackgroundColor={"transparent"}
          inactiveTextColor={"grey"}
          values={["Tudo", "Incompleto", "Sem Foto"]}
          value={this.state.filter}
          onSelect={(val) => {
            this.filterButtonGroup(val);
            this.setState({ filter: val });
          }}
        />
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
  searchText: string;
  filter: string;
};

type Props = {
  navigation: NavigationProp<null>;
};
