import { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { colors, WIDTH } from "../styles";
import { DarkTheme } from "react-native-paper";


const gradientColor = [
  "rgba(239,236,236,0.5)",
  "rgba(255,255,255,0.6)",
  "#ffffff",
];

const MangaDetailsHeader = ({
  manga: { cover, name, author, status, description, genres, chapters,rating, latestChapter },
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const onBackArrowPress = () => navigation.goBack();

  
const LineDivider = () => {
  return (
      <View style={{ width: 1, paddingVertical: 5 }}>
          <View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}></View>
      </View>
  )
}

  return (
    <View style={styles.screenContainer}>
      <ImageBackground source={{ uri: cover }} style={styles.imageBackground}>
        <LinearGradient
          colors={gradientColor}
          style={[styles.gradient, { paddingTop: insets.top }]}
        >
          <View style={styles.header}>
            <Pressable onPress={onBackArrowPress}>
              <Ionicons name="arrow-back" size={24} color={colors.red} />
            </Pressable>

            <MaterialIcons name="favorite-border" size={24} color="black" />
          </View>

          <View style={styles.detailsHeader}>
            <View style={styles.coverImageContainer}>
              <Image source={{ uri: cover }} style={styles.coverImage} />
            </View>
            
        

            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.authorsContainer}>
                {author.map((author, index) => (
                  <Text key={index.toString()}>{author.name}, </Text>
                ))}
              </View>

              <Text style={styles.status}>{status}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}
                >
                   

                    {/* Pages */}
                    <View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{chapters.length}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.white }}>Chapters</Text>
                    </View>

                    <LineDivider/>
                     {/* Rating */}
                     <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{rating}/5 </Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.white }}>Rating</Text>
                    </View>

                   

                   

                </View>

      <View style={styles.descriptionContainer}>
        <Text style={{color : COLORS.darkRed, fontWeight: 'bold'}}>{description.trim()}</Text>
      </View>

      <ScrollView
        horizontal
        fadingEdgeLength={20}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.genresContainer}>
          {genres.map((genre) => (
            <View key={genre.id} style={styles.genre}>
              
              <Text>{genre.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.chaptersContainer}>
        <Text style={styles.totalChapters}>{chapters.length} Chapters</Text>

        <Ionicons name="md-filter-sharp" size={20} color={colors.black} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 12,

    paddingBottom: 12,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  coverImageContainer: {
    overflow: "hidden",
    borderRadius: 3,
    borderWidth: 0.5,
  },
  coverImage: { width: WIDTH / 3.5, height: WIDTH / 2.5 },
  nameContainer: { flexShrink: 1, marginLeft: 12 },
  name: { fontSize: 24, fontWeight: "bold" },
  authorsContainer: { flexDirection: "row", flexWrap: "wrap" },
  status: { color: "gray" },
  descriptionContainer: { marginHorizontal: 12 },
  genresContainer: {
    flex: 1,
    flexDirection: "row",
    paddingRight: 12,
    paddingLeft: 12,
    marginVertical: 12,
  },
  genre: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.light,
    marginRight: 5,
    borderRadius: 5,
  },
  chaptersContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginBottom: 12,
  },
  totalChapters: { fontWeight: "bold", fontSize: 16 },
});

export default memo(MangaDetailsHeader);
