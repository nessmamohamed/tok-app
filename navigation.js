
//navigation
import {NavigationContainer } from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();



//pages
import Home from './pages/home';
import Fav from './pages/fav';

import { AntDesign , Entypo} from '@expo/vector-icons';
import Room from './pages/room';
import Settings from './pages/settings';



import React, { useEffect } from 'react';
import more from './pages/more';
import Room_Settings from './pages/room_settings';
import Add_account from './pages/add_account';
import Account_Edit from './pages/account_Edit';
import Background from './pages/models/background';
import Edit_account from './pages/edit_account';

import { useDispatch, useSelector } from "react-redux";
import { blocked_devices, getAllRoomsFetch, getCountriesFetch, set_countries_count, set_online_count, set_rooms_count } from "./reducers/room";
import Rooms from './pages/rooms';
import { getDevice, getNetwork, getToken, loadUser, user_loading } from './reducers/user';
import socket from './socket';





const Main = () => {


  let dispatch = useDispatch()
     
dispatch(getCountriesFetch())
dispatch(getAllRoomsFetch())
dispatch(getToken())
dispatch(user_loading())
dispatch(loadUser())
dispatch(getNetwork())
dispatch(getDevice())
dispatch(blocked_devices())



  
  return(
    <Tab.Navigator   
     barStyle={{ backgroundColor: 'white', height: 90,}} 
      sceneAnimationType='shifting' 
       
     >

    <Tab.Screen   name="Home" component={Home} 
    
     options = { ({navigation}) => ({
       tabBarLabel: 'الغرف' ,
       tabBarIcon: ({  color  }) => (
         <AntDesign name="home" size={24} color={color}   />
        ) ,
         
        
       
      })}   />
  
    <Tab.Screen name="fav" component={Fav} options = {{
       tabBarLabel: 'المفضلة' ,
       
       tabBarIcon: ({color }) => (
         <AntDesign name="star" size={24} color={color}  />
        ) ,
        
       
      }} 
      
      />
  
  <Tab.Screen name="more" component={more} options = {{
       tabBarLabel: 'المزيد' ,
       
       tabBarIcon: ({color}) => (
        <Entypo name="dots-three-horizontal" size={24} color={color} />
        ) ,
       
      }} />
  </Tab.Navigator>
  )
}


export default function Navigation () {

  let dispatch = useDispatch()


  let countries = useSelector(state => state.rooms.countries) || []


  useEffect(() => {
    socket.on('rooms-count' , (data) => {
    
      dispatch(set_rooms_count(data))
      
        })
    
        socket.on('countries' , (data) => {
    
          console.log(data)
    
          let counts = Object.values(data) || []
          let sum = counts.reduce((a, b) => a + b)
    
          dispatch(set_online_count(sum))
          
         let all_count =  countries.map(c => {
          return  {...c , visitors : data[c.name]}
          })
    
         all_count.sort((c1, c2) => {
            return   c1.visitors < c2.visitors ? 1 : c1.visitors > c2.visitors ? -1 : 0
          })
        dispatch(set_countries_count(data))
    
        })
  }, []);

    return(
        
      
    <NavigationContainer>

<Stack.Navigator>


<Stack.Screen name = 'Main' component={Main} options = {{headerShown: false }}/>

<Stack.Screen name = 'rooms' component={Rooms} options = {{headerShown: false }} /> 

<Stack.Screen name = 'room' component={Room} options = {{headerShown: false , gestureEnabled: false}}/>

 
 <Stack.Screen name = 'room_settings' component={Room_Settings} options = {{headerShown: false }} /> 



 <Stack.Screen name = 'background' component={Background} options = {{headerShown: false}}/>


 <Stack.Screen name = 'add_account' component={Add_account} options = {{headerShown: false }} /> 
 <Stack.Screen name = 'edit_account' component={Edit_account} options = {{headerShown: false }} /> 

 <Stack.Screen name = 'Account_Edit' component={Account_Edit} options = {{headerShown: false }}/>

 <Stack.Screen name = 'settings' component={Settings} options = {{headerShown: false }} /> 




{/**
*/}


      </Stack.Navigator>
  
</NavigationContainer>
    )
}