import React, {useState} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Button,
    List

} from 'react-native';

function  HookCounterFour (){
    const [items, setItems] = useState([])

    const addItem = () =>
    {
        setItems([...items, {
            id: items.length,
            value: Math.floor(Math.random() * 10) + 1
        }
    ])
    
    }
return (
<View>
    
<Button onPress={addItem}></Button>

<List>
    {items.map(item => (
        <List key={item.id}>{item.value}</List>
    ))}
</List>
</View>
)
    }
    export default HookCounterFour;
