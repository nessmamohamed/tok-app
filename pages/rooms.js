import { Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView, View } from "react-native";
import { Styles } from "../styles/style"

import logo from '../assets/logo.png';
import star from '../assets/star3.png';


import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Divider, Text } from "react-native-paper";
import Login from "./models/login";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { clear_error } from "../reducers/user";
import { useState } from "react";

export default function Rooms  (props) {
    let dispatch = useDispatch()


    
    
    useEffect(() => {
        
        get_fav_rooms()

    }, []);

    const [visible, setVisible] = React.useState(false);
    const [fav_rooms, set_fav_rooms] = React.useState([]);
    const [room_id, set_room_id] = React.useState('');

    const [updated_rooms , set_updated_rooms] = useState([])
  
    const showModal = (id) => {
        dispatch(clear_error())
        set_room_id(id)
        setVisible(true)

    };
    const hideModal = () => {
        setVisible(false)
        dispatch(clear_error())
    };

    const get_fav_rooms = async () => {
        const jsonValue = await AsyncStorage.getItem('fav-rooms') 
      
        set_fav_rooms( jsonValue ?  JSON.parse(jsonValue) : [])  
    };

    const set_favourite  = async ( id ) => {

        if(fav_rooms.includes(id)){
            let val = await AsyncStorage.getItem('fav-rooms') 
            let val_rooms = JSON.parse(val)
            let val2 =val_rooms.filter(d => d !== id)
            set_fav_rooms(val2)
            await AsyncStorage.setItem('fav-rooms', JSON.stringify(val_rooms));

        }else{
            let val = JSON.stringify([...fav_rooms, id])
            await AsyncStorage.setItem('fav-rooms', val);
            set_fav_rooms(val)

        }
    }

    let rooms = useSelector(state => state.rooms.rooms) || []

    let rooms_count = useSelector(state => state.rooms.rooms_count)

    useEffect(() => {
        
 
         let all_count =  rooms.map(c => {
          return  {...c , visitors : rooms_count[c._id]}
          })
         all_count.sort((c1, c2) => {
            return   c1.visitors < c2.visitors ? 1 : c1.visitors > c2.visitors ? -1 : 0
          })
        set_updated_rooms(all_count)
    
      }, [rooms]);


    return(
        <SafeAreaView style ={Styles.home_view}>

            

            <Login navigation= {props.navigation}
             visible ={visible} showModal = {showModal} hideModal ={hideModal}  room_id ={room_id} />



<View style={{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center',
 marginHorizontal: 20, height: '5%', marginTop: 10}}>

    
<Pressable onPress = {() =>  props.navigation.goBack()}>
        <FontAwesome name="angle-double-left" size={24} color="black"  />
        </Pressable>


<Text variant="titleLarge" >TOK-CHAT</Text>
<View style = {{...Styles.logo_back, height: 60, width: 60 , }}>
<Image source= {logo} style ={{width: 60, height: 60 ,}}/>
</View>

</View>


<ScrollView  style ={{...Styles.countries_card, minHeight: '97%', }}>



   <View style ={{overflow: 'hidden', borderTopRightRadius: 55, borderTopLeftRadius: 55}}>



    {updated_rooms.map((room, key ) => (
       <View key = {key}>

<Pressable  onPress = {() => showModal(room._id)} style ={{flexDirection: 'row' , padding: 20, alignItems: 'center', 
 backgroundColor: room.package_name === 'مميز' ?  '#D1FFFD' :  room.package_name === 'ذهبي' ?"#FCFFD1" : '#F8F6F6' }}>
          <Image source={ room.image ? {uri: room.image.filePath} : star} style ={{width: 50, height: 50 , borderRadius: 15}}/>
         
         <View style={{alignItems: 'flex-start', flex: 2, marginHorizontal: 20}}>
         <Text variant="bodyLarge" > {room.name}</Text>
         <Text variant="labelMedium" style ={{color: 'gray', marginTop: 5}}> {room.description || 'new room'} </Text>
      
         </View>
      
          <View flexDirection = 'row' style={{alignItems: 'center'}}>
          <Text>{room.visitors}</Text>
      
          <Pressable onPress={() => set_favourite(room._id)}>
          {fav_rooms.includes(room._id) ? 
          <AntDesign name="heart" size={24} color='red' style={{marginHorizontal: 10}} /> :
          <AntDesign name="hearto" size={24} color='gray' style={{marginHorizontal: 10}} />}

          </Pressable>
          </View>

         
          </Pressable>
          <Divider/>
        </View>

      
    ))}


   </View>


   

   
</ScrollView>



        </SafeAreaView>
    )
}