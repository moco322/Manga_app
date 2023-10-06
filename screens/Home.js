import React, {useState,useEffect, memo} from "react";
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
import { Button, List, Searchbar, TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';
import HookCounterFour from '../screens/HookCounterFour';



import { COLORS, FONTS, SIZES, icons, images } from '../constants';

import Header from '../components/Header';

import { useCallback } from "react";
import MangaCard from "../components/MangaCard";
import { useManga } from "../hooks/useManga";
import { useMangaNew } from "../hooks/useMangaNew";
import { useMangaDetails } from "../hooks/useMangaDetails";
import ChapterCard from "../components/ChapterCard";
import {Taba} from "../navigation/tabs";
import {FontAwesome} from '@expo/vector-icons';
import { TouchableHighlight } from "react-native-gesture-handler";
import MangaDetailsHeader from "../components/MangaDetailsHeader";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";


const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}


const Home = ({ navigation }) => {

    const profileData = {
        name: 'Moco',
        point: 200
    }

    const bookOtherWordsForHome = {
        id: 1,
        bookName: "Chainsaw Man",
        bookCover: images.otherWordsForHome,
        rating: 4.5,
        language: "Eng",
        pageNo: 341,
        author: "Tatsuki Fujimoto",
        genre: [
            "Action", "Comedy-horror", "Dark-fantasy"
        ],
        readed: "102k",
        description: "It follows the story of Denji, an impoverished young man who after making a contract with a dog-like devil named Pochita, he fuses with Denji, granting him the ability to transform parts of his body into chainsaws.",
        backgroundColor: "rgba(240,240,232,0.9)",
        navTintColor: "#000"
    }

    const bookTheMetropolis = {
        id: 2,
        bookName: "Naruto",
        bookCover: images.theMetropolist,
        rating: 4.1,
        language: "Eng",
        pageNo: 272,
        author: "Masashi Kishimoto",
        genre: [
            "Adventure", "Fantasy-Comedy", "Martial-arts" 
        ],
        readed: "103k",
        description: "It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts – the first set in Naruto's pre-teen years, and the second in his teens.",
        backgroundColor: "rgba(247,239,219,0.9)",
        navTintColor: "#000"
    }

    const bookTheTinyDragon = {
        id: 3,
        bookName: "Jujutsu Kaisen",
        bookCover: images.theTinyDragon,
        rating: 3.5,
        language: "Eng",
        pageNo: 110,
        author: "Gege Akutami",
        genre: [
            "Adventure, Dark Fantay, Supernatural"
        ],
        readed: "153k",
        description: "Jujutsu Kaisen is the story of Yuji Itadori, an easygoing high school student who joins the occult club at school. When they accidentally summon grotesque creatures by messing with a cursed object, Itadori fights to save his friends' lives",
        backgroundColor: "rgba(119,77,143,0.9)",
        navTintColor: "#FFF"
    }

    const bookjojo = {
        id: 4,
        bookName: "Jojo",
        bookCover: images.jojo,
        rating: 4.5,
        language: "Eng",
        pageNo: 110,
        author: "Hirohiko Araki",
        genre: [
            "Action, Adventure, Supernatural"
        ],
        readed: "153k",
        description: "JoJo's Bizarre Adventure is the story of the Joestar family, starting with Jonathan, a mild mannered Englishman who strikes up a rivalry with Dio Brando, his adopted brother. Because of a cursed mask, Dio becomes a powerful vampire, and Jonathan swears to stop him.",
        backgroundColor: "rgba(119,77,143,0.9)",
        navTintColor: "#FFF"
    }

    const bookkakegurui = {
        id: 5,
        bookName: "Kakegurui",
        bookCover: images.kakegurui,
        rating: 4.0,
        language: "Eng",
        pageNo: 110,
        author: "Homura Kawamoto",
        genre: [
            "Gambling, Psychological Thriller"
        ],
        readed: "153k",
        description: "Kakegurui – Compulsive Gambler is set at Hyakkaou Private Academy, a high-class elite school housing the children of Japan's wealthiest and most influential people, with many future leaders and professionals among the student body.",
        backgroundColor: "rgba(119,77,143,0.9)",
        navTintColor: "#FFF"
    
    }


    const myBooksData = [
        {
            ...bookOtherWordsForHome,
            completion: "Chapter 120",

        },
        {
            ...bookTheMetropolis,
            completion: "Chapter 250",

        },
        {
            ...bookTheTinyDragon,
            completion: "Chapter 300",

        },
        {
            ...bookjojo,
            completion:"Chapter 50",
        },

        {
            ...bookkakegurui,
            completion:"Chapter 247",
        }
    ]
    

    const categoriesData = [
        {
            id: 1,
            categoryName: "Best Seller",
            books: [
                bookOtherWordsForHome, bookTheMetropolis, bookTheTinyDragon, bookjojo, bookkakegurui, 
            ]
        },
        {
            id: 2,
            categoryName: "The Latest",
            books: [
                bookTheMetropolis,  bookjojo, bookkakegurui, 
            ]
        },
        {
            id: 3,
            categoryName: "Coming Soon",
            books: [
                bookTheTinyDragon, bookjojo, bookkakegurui, 
            ],
            booksfav: [],
    isloading: false,
        },
    ]



    
    const [profile, setProfile] = React.useState(profileData);
    const [myBooks, setMyBooks] = React.useState(myBooksData);
    const [favorites, setFavorites] = useState([]);
    const [categories, setCategories] = React.useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(1);
    const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();


    const CARD_MARGIN = 10;

    const [manga, setPageNo, isRefreshing, setManga] = useManga();
    const [manga1] = useMangaNew();
    const [mangaData, setmangaLo] = useState(manga);
    const [datafromState,setData] = useManga();
    const [Mangagenre, setMangaGenre]= useMangaDetails();

      



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 48,
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
  });

  state = {
    books: [
      {
        id: 1,
        name: "Rahvayana",
        
        description:
          "Yang menulis di buku ini belum tentu saya, sebab Rahwana tak mati-mati. Gunung kembar Sondara-Sondari yang mengimpit Rahwana cuma mematikan tubuhnya semata. Jiwa Rahwana terus hidup. Hidupnya menjadi gelembung-gelembung alias jisim. Siapa pun bisa dihinggapi gelembung itu, tak terkecuali saya.   Yang menulis di buku ini barangkali gelembung-gelembung itu, jisim…",
        author: "Sujiwo Tejo"
      },
      {
        id: 2,
        name: "Tuhan Maha Asyik",
        
        description:
          "Melalui kisah-kisah yang dikemas dalam dialog polos ala dunia bocah, Sujiwo Tejo dan Buya MN. Kamba coba mengajak kita ”bermain-main” untuk memperkenalkan ke-Maha Asyik-an Tuhan. Tuhan sangat asyik ketika Dia tidak kita kurung paksa dalam penamaan-penamaan dan pemaknaan-pemaknaan. Dia tak terdefinisikan. Dia tak terkmaknakan. Dia ada sebelum definisi dan makna…",
        author: "Sujiwo Tejo"
      },
      {
        id: 3,
        name: "Sabdo Cinta Angon Kasih",
        
        description:
          "Mbok Jamu berselendang ungu itu menjadi sumber kebahagiaan bagi orang-orang yang datang dan pergi membeli dagangannya. Bukan karena rambut hitam kehijauannya, lereng keningnya yang bening, atau kecantikannya yang tiada tara. Para pria menjadi platinum member jamunya karena Mbok Jamu pintar memosisikan diri sebagai konco wingking. Perempuan yang posisinya selangkah di…",
        author: "Sujiwo Tejo"
      },
      {
        id: 4,
        name: "Talijiwo",
        
        description:
          "Sudah berapa lama kau terjebak dengan beragam kesibukan yang tak habis-habis itu? Berhentilah berbusa-busa tentang kemerdekaan bila ternyata kau sendiri tak punya waktu luang. Padahal, hanya di dalam waktu luang manusia bisa berpikir dan merenung tentang bagaimana seyogianya mengisi kemerdekaan hidup. Maka, waktu luang itu jangan dimampatkan lagi dengan melulu…",
        author: "Sujiwo Tejo"
      }
    ],
    
  };

  addToFavorite = id => {
    const data = this.state.books.find(item => item.id === id);
    this.setState({
      booksfav: [...this.state.booksfav, data]
    });
  };



  deleteToFavorite = id => 
  {
    const hapus = this.state.booksfav.fitler(item => item.id !== id);
    this.setState({booksfav: hapus});
  };

  addNewBook = data => {
    this.setState({
        books: [data, ...this.state.books]
    })
  }


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

    function renderButtonSection(myBooks) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
                <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ flex: 1 }}

                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.claim_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Claim</Text>
                        </View>
                    </TouchableOpacity>

              </View>
              </View>
        )
    }

    


    function renderMyBookSection5(manga) {
        const renderItem = ({item, index}) => {
            
                return(
                    <View style={{backgroundColor:"green"}}>
                        <Text>{item.name}</Text>
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

            return (
                
                <SafeAreaView style={{ flex: 1 }}>
        
                <View style={{flex: 0}}>
                  <View style={{ zIndex: 0 }}>
                  <FlatList
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        data={manga}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        removeClippedSubviews={true}
        windowSize={10}
        numColumns={4}
        columnWrapperStyle={{
          marginBottom: CARD_MARGIN,
          marginLeft: CARD_MARGIN,
        }}
        
      />
                    </View>
                  </View>
                  </SafeAreaView>
            )
        }
      
       
    //Lalar Carousel 1 deh heseg


    function renderMyBookSection(manga) {
        const renderItem = ({item, index }) => {

            const marginLeft = index === 0 ? SIZES.padding : SIZES.h1; // Apply margin to the first item in each row
            const marginRight = SIZES.radius;
                
return (
                <TouchableOpacity
                    style={{
                        flex: 1,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: SIZES.base, // Add marginBottom to create vertical spacing
                    }}
                    onPress={() => navigation.navigate("MangaView", {
                        id: item.id
                    })}
                >
                    
                    <Text numberOfLines={1} style={{ marginLeft: 0, ...FONTS.body4, color: COLORS.white, width: 110}}>{item.name}</Text>
                    {/* Book Cover */}
                    <Image
                        source={{uri:item.image}}
                        resizeMode="cover"
                        style={{
                            width: 100,
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


                          {/* Favevorite section (buttion)


                         <Text numberOfLines={1} style={{ marginLeft: 0, ...FONTS.body3, color: COLORS.lightGray, width: 140}}>{item.latestChapter}</Text>
                         <View>

                        

                         {favorites.includes(item) ? (
               <Pressable onPress={() => setFavorites(favorites.filter((x) => x.id !== item.id))}>
               <Text
                 style={{
                   borderColor: "gray",
                   borderWidth: 1,
                   marginVertical: 10,
                   padding: 5,
                 }}
               >
                REMOVE FROM CART
               </Text>
             </Pressable>
            ):(
              <Pressable onPress={() => setFavorites([...favorites,item])}>
              <Text
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  marginVertical: 10,
                  padding: 5,
                }}
              >
                ADD TO Favorites
              </Text>
            </Pressable> 
             */}
            
           
          </View>

                            
                </TouchableOpacity>
)}

                        
const changeNumColumns = (newNumColumns) => {
    // Update the number of columns and re-render the FlatList
    setNumColumns(newNumColumns);
  };
  
        

        
        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between', paddingTop:SIZES.padding }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Latest Manga</Text>

                    <TouchableOpacity
                        onPress={() => console.log("See More")}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>More</Text>
                    </TouchableOpacity>
                </View>

                

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
      <FlatList
        key={`FlatList-${3}`} // Set a unique key for the FlatList
        data={manga.slice(0, 6)} // Show only the first 6 items
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        horizontal={false} // Remove horizontal prop
        numColumns={3} // Use the numColumns state
      />
    </View>






            </View>
        )
            
        
    }

     
    function renderMyBookSection6(favorites) {
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

                    </TouchableOpacity>
            
            )
    }
    
         
            return (
                <View style={{ flex: 1 }}>
                    {/* Header */}
                    <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between', paddingTop:SIZES.padding }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Latest Manga</Text>
    
                        <TouchableOpacity
                            onPress={() => console.log("See More")}
                        >
                            <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>More</Text>
                        </TouchableOpacity>
                    </View>
    
                    
    
                    {/* Books */}
                    <View style={{ flex: 1, marginTop: SIZES.padding }}>
                        <FlatList
                            data={favorites}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            )
        }




    
    function renderMyBookSectionnew(manga1) {
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
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Latest Manga</Text>

                    <TouchableOpacity
                        onPress={() => console.log("See More")}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>More</Text>
                    </TouchableOpacity>
                </View>

                

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={manga1}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
        
    }


    //Lalar carausel 2doh heseg
    function renderMyBookSection2(myBooks) {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => navigation.navigate("BookDetail", {
                        book: item
                    })}
                >
                    {/* Book Cover */}
                    <Image
                        source={item.bookCover}
                        resizeMode="cover"
                        style={{
                            width: 180,
                            height: 250,
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
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.completion}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Recent Uploads</Text>

                    <TouchableOpacity
                        onPress={() => console.log("More")}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>More</Text>
                    </TouchableOpacity>
                </View>

                

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
        
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
        

        const onEndReached = useCallback(() => {
            if (!isRefreshing) {
              setPageNo((prevState) => prevState + 1);
            }
          }, [isRefreshing]);
        
          const onRefresh = useCallback(() => {
            setPageNo(1);
          }, []);

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

   

    function renderMyBookSectionFav() {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => navigation.navigate("BookDetail", {
                        book: item
                    })}
                >
                    {/* Book Cover */}
                    <Image
                        source={item.bookCover}
                        resizeMode="cover"
                        style={{
                            width: 180,
                            height: 250,
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
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.completion}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Favorites</Text>

                    <TouchableOpacity
                        onPress={() => console.log("More")}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>More</Text>
                    </TouchableOpacity>
                </View>

                

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
        
    }
    
    

    function renderCategoryHeader() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ flex: 1, marginRight: SIZES.padding }}
                    onPress={() => setSelectedCategory(item.id)}
                >
                    {
                        selectedCategory == item.id &&
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.categoryName}</Text>
                    }
                    {
                        selectedCategory != item.id &&
                        <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>{item.categoryName}</Text>
                    }
                </TouchableOpacity>

                
            )
        }

        return (
            <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                />
            </View>
            
        )
    }

    const searchmanga = (input) => {

            

        if (input.length === 0) {
          setmangaLo(manga);
        }
    
        const filteredData = manga.filter((item) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        );
    
        if (filteredData.length === 0) {
          setmangaLo(manga);
        } else {
          setmangaLo(filteredData);
        }
      };
    

    const Searchh = (manga) =>
{
  return ( 
  <View style={styles.bg}>
    <FontAwesome style={styles.icon} name="search"/>
    <TextInput
    style={styles.textIn} 
                placeholder="Search Manga"
              
                onChangeText={searchmanga}
              />
  </View>
  )
}




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* Header Section */}
            <View style={{ height: 100 }}>
                
            
               
                
                
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius }}>
                {/* Books Section */}
                
                <View>
                 
                    {renderMyBookSection(manga)}
                    {renderMyBookSectionnew(manga1)}
                    

                    
                    
                    
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
                    
                     
                  
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    
}

export default Home;