import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { BookDetail } from "./screens/";
import Tabs from "./navigation/tabs";
import Taba from "./navigation/tabs"
import { useFonts } from 'expo-font';
import {MangaViewScreen} from "./screens/MangaViewScreen";
import {ViewChapterScreen} from "./screens/ViewChapterScreen";
import {SearchViewScreen} from './screens/SearchViewScreen';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {
    const [loaded] = useFonts({
            "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
            "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
            "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
        })

    if(!loaded){
        return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />

                <Stack.Screen name="MangaView" component={MangaViewScreen} />
                <Stack.Screen name="ViewChapter" component={ViewChapterScreen} />
                <Stack.Screen name="SearchBars" component={SearchViewScreen} />
                

                {/* Screens */}
                
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />

                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;