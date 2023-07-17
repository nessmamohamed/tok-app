import { Text as Mini} from "@react-native-material/core";
import { Image, Pressable, SafeAreaView } from "react-native";
import { Text, View } from "react-native";

import egypt from '../assets/egypt.png'


import {AntDesign} from '@expo/vector-icons'
import AppBar from "./components/AppBar";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import React from "react";

import star from '../assets/star3.png';


export default function Fav () {

    
          
    useEffect(() => {
        
        get_fav_rooms()

    }, []);
    
    const [fav_rooms, set_fav_rooms] = React.useState([]);
    let rooms = useSelector(state=> state.rooms.allRooms) || []
    let countries = useSelector(state=> state.rooms.countries) || []
    
    const get_fav_rooms = async () => {
        const jsonValue = await AsyncStorage.getItem('fav-rooms') 
        const rooms_id = jsonValue ?  JSON.parse(jsonValue) : []
        rooms.map(room => {
            if(rooms_id.includes(room._id) && !fav_rooms.includes(room)){
                set_fav_rooms([...fav_rooms, room])
            }
        })
    };

    const get_country_pic = (name) => {
       let country =  countries.filter(c => c.name === name ) || []
       return country[0].url
    }


    const delete_favourite  = async ( id ) => {


        const jsonValue = await AsyncStorage.getItem('fav-rooms') 
        const rooms_id = jsonValue ?  JSON.parse(jsonValue) : []

   
            let val2 =rooms_id.filter(d => d !== id)
            await AsyncStorage.setItem('fav-rooms', JSON.stringify(val2));

           set_fav_rooms( fav_rooms.filter(room  => room._id !== id))

      
    }



    return(
        <SafeAreaView  >
            

          <AppBar/>

         {fav_rooms.map((room, key) => (
               <View key ={key} style ={{backgroundColor: '#D1F0FF', height: 100 , flexDirection: 'row' , shadowColor: 'black', elevation: 10 , shadowOpacity: 0.5, alignItems: 'center', padding: 20}}>
               <Image source={ room.image ? {uri: room.image.filePath} : star} style={{width: 70 , height: 70, borderRadius: 10}}/>
  
               <View style ={{marginHorizontal: 20, alignItems: 'flex-start' ,flex: 2 , }}>
                  <Text>{room.name}</Text>
                  <Mini variant="caption" style={{marginTop: 5}}>{room.description || 'new room'}</Mini>
  
               
                 <View style ={{flexDirection: 'row', marginTop : 10, alignItems: 'center' , justifyContent: 'space-between' , width: '100%'}} >
  
  <View flexDirection= 'row' >
  <Image src={get_country_pic(room.country)} style ={{width: 15 , height: 15}}/>
  <Mini variant="caption" style={{marginHorizontal: 8}}>{room.country} </Mini>
  </View>
  
  <View flexDirection = 'row' style={{alignItems: 'center'}}>
   <Mini variant="caption"> 33 </Mini>
   <Pressable onPress={ () => delete_favourite(room._id)}>
   <AntDesign name="heart" size={24} color="red" />
   </Pressable>
  </View>
  
   </View>
                
               </View>
              </View>
         ))}
           
        </SafeAreaView>
    )
}