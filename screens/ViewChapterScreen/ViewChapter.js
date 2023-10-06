import { View, StatusBar, FlatList } from "react-native";

import { styles } from "./styles";
import { useChapterDetails } from "../../hooks/useChapterDetails";
import { Loader } from "../../components/common/Loader";
import ChapterImage from "../../components/ChapterImage";

export const ViewChapter = ({ route }) => {
  const { mangaId, chapterId } = route.params;

  const [chapter, isLoading] = useChapterDetails(mangaId, chapterId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      
        <FlatList
          data={chapter}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
          removeClippedSubviews={true}
          windowSize={10}
        />
  
    </View>
  );
};

const renderItem = ({ item }) => <ChapterImage {...item} />;
