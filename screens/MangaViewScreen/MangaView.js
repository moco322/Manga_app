import { FlatList, View, StatusBar } from "react-native";

import { useMangaDetails } from "../../hooks/useMangaDetails";
import { Loader } from "../../components/common/Loader";
import { styles } from "./styles";
import ChapterCard from "../../components/ChapterCard";
import MangaDetailsHeader from "../../components/MangaDetailsHeader";
import {Taba} from "../../navigation/tabs";
import { FONTS, COLORS, SIZES, icons } from "../../constants";

export const MangaView = ({ route }) => {
  const { id } = route.params;

  const [manga, isLoading] = useMangaDetails(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />

      <FlatList
        data={manga.chapters}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        windowSize={10}
        ListHeaderComponent={<MangaDetailsHeader manga={manga} />}
      />
    </View>
  );
};

const renderItems = ({ item }) => <ChapterCard {...item} />;
