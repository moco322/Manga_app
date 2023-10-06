import { memo } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

const ChapterCard = ({ name, date, id }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id: mangaId } = route.params;

  const openChapter = () => {
    navigation.navigate("ViewChapter", {
      mangaId: mangaId,
      chapterId: id,
    });
  };

  return (
    <Pressable style={styles.container} onPress={openChapter}>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.time} numberOfLines={1}>
        {dayjs(date, "MMM DD,YY").format("DD/MM/YYYY")}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
  },
});

export default memo(ChapterCard);
