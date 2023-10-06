import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors } from "../styles";

const ICON_SIZE = 12;
const stars = [1, 2, 3, 4, 5];
const getStars = (rating, star) => (rating >= star ? "star" : "star-outline");

export const Rating = ({ rating }) => (
  <View style={styles.rating}>
    {stars.map((star) => {
      const icon = getStars(rating, star);
      return (
        <Ionicons
          key={star.toString()}
          name={icon}
          size={ICON_SIZE}
          color={colors.orange}
        />
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
