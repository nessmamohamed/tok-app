import { Image, SafeAreaView, Text, View , Animated , Easing,  StatusBar } from "react-native";
import { Styles } from "../styles/style";
import logo from '../assets/logo.png'
import { useEffect, useRef, useState } from "react";


import Countries from "./components/countries";

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";




export default function Home (props){

  let all_rooms = useSelector(state => state.rooms.allRooms)

  let online = useSelector(state => state.rooms.online_count)



  //animation *******************
    const translation = useRef(new Animated.Value(-200)).current;
    const roadAnimation = Animated.timing(translation, {
      toValue: 250,
      duration: 4500,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const startAnimation = () => {
        roadAnimation.start(() => {
          roadAnimation.reset();
          startAnimation();
        });
      };

      useEffect(() => {
        startAnimation();
      }, []);

    

      const RoadLine = () => {
        return (
          <Animated.View
            style={{ transform: [{ translateX: translation }] ,  width: '200%',
            flexDirection:'row', }}
          >
            <Text> مســــاحة اعلانيــــة</Text>
          </Animated.View>
        );
      };




      

    
    return(
    
           <SafeAreaView  style ={Styles.home_view}  >
            <StatusBar />
       

           { /* first view*/}
            <View style ={{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '2%' }}>

            <View style = {{   paddingLeft: 10, }}>
  <Text style ={{fontSize: 17}}>
  الدعم الفني
  </Text>
</View>

<View style ={Styles.advert}>
<RoadLine/>
</View>


<View style = {Styles.logo_back}>
<Image source= {logo} style ={{width: 60, height: 60 ,}}/>
</View>



            </View>

           {/**card */}

           <View style ={Styles.countries_card}>

           <Countries navigation = {props.navigation} />

            <View style={Styles.yellow_bar}>
    
<View style={{flexDirection: 'row', alignItems: 'center'  , justifyContent: 'flex-end', width: '100%'}}>

<View style={{flexDirection: 'row', alignItems: 'center'}}>
<Text style={{color: '#141212AE', marginHorizontal: 5}}>
   {all_rooms.length} الغرف</Text>
   <MaterialIcons name="sms" size={15} color="#141212AE" />

</View>


 <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5}}>
<Text style={{color: '#141212AE', marginHorizontal: 5}}>
   {online} المستخدمين</Text>
</View>
<FontAwesome5 name="users" size={15} color="#141212AE" />


</View>
</View>
     


           </View>
       
           </SafeAreaView>
    
    )
}