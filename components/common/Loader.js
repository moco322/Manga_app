import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";

import { colors } from "../../styles";
import {COLORS} from "../../constants"

export const Loader = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor="white" />
    <ActivityIndicator color={colors.black} size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.darkBlue,
  },
});
