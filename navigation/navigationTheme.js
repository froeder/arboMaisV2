import { DefaultTheme } from "@react-navigation/native";

import { Colors } from "../config";

const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    text: Colors.secondary,
    background: Colors.white,
  },
};

export default navigationTheme;
