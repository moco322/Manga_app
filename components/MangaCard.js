import { memo, useCallback } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Rating } from "./Rating";
import { colors } from "../styles";

const height = Dimensions.get("window").height;

const MangaCard = ({
  id,
  name,
  image,
  rating,
  latestChapter,
  author,
  cardStyles,
}) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate("MangaView", {
      id: id,
    });
  }, [navigation, id]);

  return (
    <Pressable style={[styles.card, cardStyles]} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.coverImage} />
      <View style={styles.footer}>
       
        
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
      
     
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    
    borderRadius: 2,
    color: colors.white,
    overflow: "hidden",
  },
  coverImage: {
        width: 120,
        height: 180,
      
    
  },
  footer: {
    padding: 4,
  },
  footerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },
  author: {
    fontSize: 10,
  },

  title :
  {
    color: colors.white,
  }
});

export default memo(MangaCard);
