import { StyleSheet } from "react-native";

import { colors, WIDTH } from "../../styles";
import { HEIGHT } from "../../styles/styles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.black,
  },
  zoomView: {
    height: HEIGHT,
    width: WIDTH,
  },
});
