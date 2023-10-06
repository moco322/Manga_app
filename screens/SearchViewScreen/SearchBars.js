import React, {useState,useEffect, Component} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    ActivityIndicator

} from 'react-native';
import { Searchbar, TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";



import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

import Header from '../../components/Header';

import { useCallback } from "react";
import { useManga } from "../../hooks/useManga";
import { useMangaNew } from "../../hooks/useMangaNew";
import ChapterCard from "../../components/ChapterCard";
import MangaCard from "../../components/MangaCard";
import {FontAwesome} from '@expo/vector-icons';
import { TouchableHighlight } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaFrame } from "react-native-safe-area-context";


const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}


export const SearchBars = ({ navigation }) => {

    const profileData = {
        name: 'Moco',
        point: 200
    }

   
    const [profile, setProfile] = React.useState(profileData);
    const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();


    const CARD_MARGIN = 10;

    const [manga, setPageNo, isRefreshing, setManga] = useManga();
    const [manga1] = useMangaNew();

    const [mangaData, setmangaLo] = useState(manga);
    

        const [datafromState,setData] = useManga();
        const [Fav,setFav] = useManga();





const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 10,
    },
    movieText: {
      fontSize: 26,
      fontWeight: "200",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
    },
    description: {
      textAlign: "center",
      marginBottom: 18,
      fontWeight: "200",
      color: "green",
    },
    bg:{
      marginTop: 15,
      backgroundColor: '#e0e0e0',
      height : 50,
      borderRadius :5,
      marginHorizantal: 15,
      flexDirection: "row",
      marginBottom :10
    },
    icon: {
      fontSize: 25,
      alignSelf: 'center',
      marginHorizontal: 10
    },
    textIn:{
      fontSize: 18,
      flex: 1
    },
    search_icon_box : {
      width: 40,
      height: 40,
      borderRadius : 40,
      backgroundColor: '#e4e6eb',
      flexDirection :'row',
      justifyContent : 'center',
      alignItems: 'center'
    },
    input_box : {
      height: 50,
      flexDirection : 'row',
      alignItems : 'center',
      position: 'absolute',
      top :0, 
      left : 0,
      backgroundColor : 'white',
      
    }

  });

    function renderHeader(profile) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                {/* Greetings */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Good Morning</Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profile.name}</Text>
                    </View>
                </View>

                {/* Points */}
                
            </View>
        )
    }

    const onEndReached = useCallback(() => {
        if (!isRefreshing) {
          setPageNo((prevState) => prevState + 1);
        }
      }, [isRefreshing]);
    
      const onRefresh = useCallback(() => {
        setPageNo(1);
      }, []);
    

    
const addFavManga=(manga)=>
{
  const newFavMangaList= [...Fav, manga];
  setFav(newFavMangaList);
}
    

    //Carousel 3 dah heseg

   
    function renderMyBookSection3(mangaData) {
        const renderItem = ({item, index }) => {
            return (
                


                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius,
                    }}
                    onPress={() => navigation.navigate("MangaView", {
                        id: item.id
                    })}
                >
                    <Text numberOfLines={1} style={{ marginLeft: 0, ...FONTS.body2, color: COLORS.white, width: 140}}>{item.name}</Text>
                    {/* Book Cover */}
                    <Image
                        source={{uri:item.image}}
                        resizeMode="cover"
                        style={{
                            width: 120,
                            height: 180,
                            borderRadius: 20
                        }}
                    />
                     

                    {/* Book Info */}
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>
                      
                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                         <Text numberOfLines={1} style={{ marginLeft: 0, ...FONTS.body3, color: COLORS.lightGray, width: 140}}>{item.latestChapter}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    
        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between', paddingTop:SIZES.padding }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Hot Manga</Text>

                    <TouchableOpacity
                        onPress={() => console.log("See More")}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>More</Text>
                    </TouchableOpacity>
                </View>

                

                {/* Books */}
                <View style={{ flex: 2, marginTop: SIZES.padding }}>
                <FlatList
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                        data={mangaData}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
        
    }

       //Lalar Carousel 1 deh heseg
       function renderMyBookSection(mangaData) {
        const renderItems = ({ item, index }) => (
            <MangaCard
              {...item}
              cardStyles={{
                marginRight: CARD_MARGIN,
                marginTop: index < 3 ? CARD_MARGIN : 0,
              }}
            />
          );
       
    
    return (
        <SafeAreaView style={styles.screen}>
          <FlatList
            data={mangaData}
            renderItem={renderItems}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            keyExtractor={(item) => item.name}
            removeClippedSubviews={true}
            windowSize={3}
            numColumns={3}
            columnWrapperStyle={{
              marginBottom: CARD_MARGIN,
              marginLeft: CARD_MARGIN,
            }}
            ListHeaderComponent={<Header />}
          />
        </SafeAreaView>
      );
    };
      
    const searchmanga = (input) => {

            

        if (input.length === 0) {
          setmangaLo(mangaData);
        }
    
        const filteredData = manga.filter((item) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        );
    
        if (filteredData.length === 0) {
          setmangaLo(mangaData);
        } else {
          setmangaLo(filteredData);
        }
      };
    
const Searchh = (mangaData) =>
{
  return <View style={styles.bg}>
    <FontAwesome style={styles.icon} name="search"/>
    <TextInput
    style={styles.textIn} 
                placeholder="Search Manga"
              
                onChangeText={searchmanga}
              />
  </View>
}


class Searcher extends React.Component {
  constructor (props)
  {
    super(props)
  
  this.state = {
    isFocused :false ,
    keyword: ''
  }

  this._input_box_translate_x = new Value(width)
  this.back_button_opacity = new Value (0)
  this.content_translate_y = new Value (height) 
  this.content_opacity= new Value (0)

  }

render (){

    return (
        <View>
   <TouchableHighlight
    activeOpacity={1}
    underlayColor={'#ccd0d5'}
    
    style={styles.search_icon_box}
    >
      <Icon name="search" size={22} color="#000000" />

      </TouchableHighlight>
      <Animated.View style ={[styles.input_box, {transform: [{translateX: this._input_box_translate_x}] }] }>

      </Animated.View>
        </View>
        )
    }
  }
    


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* Header Section */}
              
    
                {/* Body Section */}
                <ScrollView style={{ marginTop: SIZES.radius }}>
                    {/* Books Section */}
                    <View>
                    
                
                        
                        
                        
                        <SafeAreaView style={styles.screen}>
          <FlatList
            
            
            ></FlatList>
            </SafeAreaView>
    
                    </View>
    
    <View>
    <Header />
    <View>
      
                    <View>
                    </View>
                    </View>
                    </View>
    
                    {/* Categories Section */}
                    <View style={{ marginTop: SIZES.padding }}>
                        <View>
                        </View>
                        <View>
                        <View>
                          
                          {Searchh(mangaData)}
              <View>
              {renderMyBookSection(mangaData)}
              </View>
                  
                    </View>
                        </View>
                    </View>
                </ScrollView>
                <View>
                    </View>
            </SafeAreaView>
            
        )
        }
    