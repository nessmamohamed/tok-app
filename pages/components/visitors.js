import { View, Image } from "react-native";
import { Divider, Text, Menu, Snackbar } from "react-native-paper";
import {  Animated, Easing, Platform} from "react-native";
import pro from '../../assets/pro.png'

import sleep from '../../assets/sleep.png'
import out from '../../assets/out.png'
import busy from '../../assets/busy.png'
import call from '../../assets/phone.png'
import food from '../../assets/food.png'

import crown from '../../assets/crown.png'


import { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import User_info from "../models/user_info";
import Profile_view from "../models/profile_view";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React from "react";
import User_info_error from "../models/user_info_error";
import { block_device, set_mention } from "../../reducers/room";
import socket from "../../socket";
import Stop_modal from "../models/stop_modal";

import {REACT_APP_URL} from '@env'
import axios from "axios";

import msg_stop_img from '../../assets/msg-stop.png'
import msgs_stop_img from '../../assets/msgs-stop.png'

import mic_stop_img from '../../assets/mic-stop.png'


import back1 from '../../assets/back1.jpg'
import back2 from '../../assets/back2.jpg'
import back3 from '../../assets/back3.jpg'
import back4 from '../../assets/back4.jpg'
import back5 from '../../assets/back5.jpg'
import back6 from '../../assets/back6.jpg'
import back7 from '../../assets/back7.jpg'
import back8 from '../../assets/back8.jpg'
import back9 from '../../assets/back9.jpg'
import back10 from '../../assets/back10.jpg'
import back11 from '../../assets/back11.jpg'
import back12 from '../../assets/back12.jpg'


export default function Visitors (props) {

  let dispatch = useDispatch()
  const translation = useRef(new Animated.Value(-200)).current;
  const roadAnimation = Animated.timing(translation, {
    toValue: 250,
    duration: 6500,
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
      getIgnored()
    }, []);

    const getIgnored = async () => {
      let ignored_list = await AsyncStorage.getItem('ignored')
      let parsed = JSON.parse(ignored_list) || []
      set_ignored(parsed)
    }


    const [visible, setVisible] = useState(false);
    const [user_info_modal, set_user_info_modal] = useState(false);
    const [profile_modal, set_profile_modal] = useState(false);
    const [menu_id , set_menu_id ]= useState(false);
    const [user_info, set_user_info] = useState({}) 
    const [user_info_error, set_user_error] = useState(false) 
    const [error , set_error] = useState('')
    const [stop_modal , set_stop_modal] = useState(false)
    const [ignored , set_ignored] = useState([])
    const [stop_user , set_stop_user] = useState({})
    
    let me = useSelector(state => state.user.me) || {}
    let room = useSelector(state => state.rooms.room) || {}
    let blocked = useSelector(state => state.rooms.blocked_devices)
    let devices = blocked.filter(b => b.room === room._id)
    let my_device = useSelector(state => state.user.device)
    
  
    const closeMenu = () => setVisible(false);
    const closeErrorMenu = () => set_user_error(false);
    const close_stop = () => set_stop_modal(false)

    let pics2 = {
      'back1': back1,
      'back2': back2,
      'back3': back3,
      'back4': back4,
      'back5': back5,
      'back6': back6,
      'back7': back7,
      'back8': back8,
      'back9': back9,
      'back10': back10,
      'back11': back11,
      'back12': back12,

  }


    const accept_stop = ({msgs, private_msgs, mic}) => {
      close_stop()
      let device = stop_user.device
       let body ={msgs , private_msgs , mic , device , room: room._id}
       axios.post(`${REACT_APP_URL}/stopped`, body)
       .then(() =>  socket.emit('user-stopped' , ({roomId: room._id, type: 'stop' , stop: body , name: stop_user.name, stop_by: me.name})))

    }


    const cancel_stop = (u) => {
      axios.delete(`${REACT_APP_URL}/stopped/${isStopped(u)._id}` )
        
      socket.emit('user-stopped' , ({roomId: room._id, type: 'cancel' , stop:  isStopped(u),  name: u.name, stop_by: me.name}))

    }

    const closeUserMenu = () => {
      set_user_info({})
      set_user_info_modal(false)
    };
    const openUserMenu = (u) =>{
      set_user_info(u)
      set_user_info_modal(true)
    };
    const closeProfile = () => {
      set_user_info({})
      set_profile_modal(false);
    }
    const openProfile = (u) =>{ 
      set_user_info(u)
      set_profile_modal(true);
    }
    
    let onlineUsers= props.props.onlineUsers || []
    let room_stopped = useSelector(state => state.rooms.room_stopped)


    let userState = {
      'out': out, 
      'busy': busy,
      'call': call,
      'eating' : food,
       'sleeping': sleep, 
    }


    let colors = {
      member: 'rgb(201 17 201)',
      admin: 'blue', 
      super_admin: 'green',
      master_boy: 'red',
      master: 'red',
      master_girl: '#ff45ac',
      visitor: 'black',
      root: 'orange'
  }


  let positions = {program_owner: 7, root : 6 , master: 5, master_boy: 4 , master_girl : 4 , super_admin: 3, admin : 2, member: 1, visitor: 0}
  let permissions = me.permissions || {}

 
let amStopped= () =>{
    let isExist = room_stopped.filter(s => JSON.stringify(s.device) === JSON.stringify(my_device))
     
    if(isExist[0] && me.type !== 'program_owner'){

      return isExist[0]
    }else{
      return false
    }
  }

let isStopped =  (u) =>{
  let isExist = room_stopped.filter(s => JSON.stringify(s.device) === JSON.stringify(u.device))
   
  if(isExist[0] && u.type !== 'program_owner'){

    return isExist[0]
  }else{
    return false
  }
}  


 const onBlockDevice  = ( device, country , name , userType , user_id, ip) => {

  let room_id = room._id
  

  let alldevices = devices.map(d=> d.device)

   if(!alldevices.includes(device)){
    
      let body = {device, room: room_id , country , name , blocked_by: me.name, userType , user_id , dummy_ip: ip}
            dispatch(block_device({body }))       
   }
}


onBlockServer = (device, country , name , userType , user_id, ip) => {

  let server_blocked = devices.filter(d => d.room === 'all')
  let devices_block = server_blocked.map(d =>  JSON.stringify(d.device) ).filter(d => d)
  let ips = server_blocked.map(d=> d.ip)


  if(!devices_block.includes(JSON.stringify(device)) || !ips.includes(ip)){
      let body = {device, room: 'all' , country , name , blocked_by: me.name, userType , user_id , dummy_ip: ip, ip}
      dispatch(block_device({body }))         
  }
}



const kick_out = (id, name) => {
  socket.emit('kick-out-alert' , ({user_id: id , room_id: room._id, kicked_by: me.name, name}))

}


const  on_ignore = async ( friend_id) => {

  if(ignored.includes(friend_id)){
      let new_ignored = ignored.filter(i => i !== friend_id)
    await AsyncStorage.setItem('ignored' , JSON.stringify([...new_ignored]) )
    getIgnored()

  }else{
      let new_ignored = [...ignored, friend_id]
     await AsyncStorage.setItem('ignored' , JSON.stringify([...new_ignored]) )
    getIgnored()

  }


}



    return(
        <View style ={{marginTop: Platform.OS === 'ios' ? -50 : 0}}>


          <Profile_view visible = {profile_modal}
           closeProfile = {closeProfile} 
          openProfile = {openProfile}
          user_info = {user_info}
          />

        <User_info  user_info_modal={user_info_modal}
                    closeUserMenu = {closeUserMenu}
                    openUserMenu = {openUserMenu}
                    user_info = {user_info}
                   />
       
    <User_info_error user_info_error ={user_info_error}
                     error = {error}
                     closeErrorMenu = {closeErrorMenu}/>

                     <Stop_modal stop_modal = {stop_modal}
                                 close_stop = {close_stop}
                                 accept_stop = {accept_stop} />
     


      {/**user */}


          {onlineUsers.map((u, key) => (
<View key = {key}>
<View  >
      
      <Menu
      visible={visible && (u._id === menu_id) && me._id !== u._id}
      onDismiss={closeMenu}
      anchor={
      <Pressable   onPress = {() => {
        set_menu_id(u._id)
        setVisible(!visible)
      }} >
      
      {/**user ------------------------------------------- */}
     
     <View>
    {/**background */}
    {u.name_type === 'royal'|| 'protected'  && u.back ?
      <Image style ={{width: '100%', height: 55}} source={pics2[u.back]}>
    
      </Image> : <View style ={{width: '100%', height: 55}}></View>}

    <View  style ={{flexDirection: 'row', alignItems: 'center',  padding: 10, backgroundColor: '#FFFFFF9E', 
  position: 'absolute' , width: '100%', height: 55}}>

{/**profile pic */}
<View>
{u.picture  ? u.picture.filePath ?
    <Image source = {{uri: u.picture.filePath}}
    style ={{width: 52 , height: 52, marginRight: 10, borderRadius: 15}}/>
  : 
  <Image source = {{uri: u.icon}}
  style ={{width: 25 , height: 25, marginRight: 10}}/>
: 
<Image source = {{uri: u.icon}}
style ={{width: 25 , height: 25, marginRight: 10}}/>}
</View>
    
    
    <View style ={{}} >
    {u.program_owner ? 
    <Text  style ={{ fontWeight: 'bold', color: 'white', textShadowColor:'black',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,}} >{u.name}</Text> :
      <Text style ={{ fontWeight: 'bold', color: colors[u.type], textShadowColor: u.name_type === ('royal' ) || u.type === ('root' ) ? '#FFD800': null,
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,}} >{u.name }</Text>}
    
    {/**statuee ------------- */}
    
    {u.statue ? 
      <View style ={{ overflow: 'hidden', width: 200}}>
    <Animated.View
            style={{ transform: [{ translateX: translation }] ,  width: '200%'
            }}
          >
          <Text  variant="bodySmall" style ={{color: '#696767', fontWeight: 'bold',}}>
           {u.statue}
           </Text>
    
          </Animated.View>
    </View>: ''}
    </View>
    
    {/**crown --------------------------- */}
    <View  style ={{position: 'absolute', right: 10 ,top: 0, flexDirection: 'row', alignItems: 'center' }}>

{u.state !== 'available' ? 
    <Image source= { userState[u.state ] } style ={{width: 20 , height: 20, marginTop: 15,}}/>
 : ''  }    
    {isStopped(u).msgs ? 
    <Image source={msgs_stop_img} style ={{marginHorizontal: 3, marginTop: 15, width: 20, height: 20}}/> : ''}
    {isStopped(u).private_msgs ? 
    <Image source={msg_stop_img} style ={{ marginTop: 15, width: 20, height: 20}} /> : ''}

    {isStopped(u).mic ? 
    <Image source={mic_stop_img} style ={{ marginTop: 15}}/> : ''}

    {u.name_type === 'royal' ? 
      <Image source={crown} style ={{ width: 30 , height: 40}}/>: ''}
    {u.name_type === 'protected' ? 
      <Image source={pro} style ={{width: 27 , height: 27  }}/>: ''}

    </View>
    
    
    </View>
     </View>
      
      </Pressable>
        }>
      
      
    {me.type !== 'visitor' ? 
     <>
      <Menu.Item onPress={() => {
        closeMenu()
        openUserMenu(u)
        }} title="معلومات المستخدم" titleStyle ={{fontSize: 13}} style ={{height:40}} />
        <Divider /> 
        </>: ''}


    {u.name_type === 'royal' || u.name_type === 'protected' ?
    <>
      <Menu.Item onPress={() => {
        closeMenu()
        openProfile(u)
      }} title="مشاهدة الملف "  titleStyle ={{fontSize: 13}} style ={{height:40}}/>
      <Divider />
      </>: ''}

      {(room.private_msg === 'masters' && positions[me.type] < 4  ) ||
                          (room.private_msg === 'masters & members' && positions[me.type] < 2   ) ||
                          room.private_msg === 'no one' ? 
     '': 
     !ignored.includes(u._id) && !amStopped().private_msg ?
      <>
     <Menu.Item onPress={() => {
       closeMenu()
      
       if(u.private_msgs){
        if(!isStopped().private_msgs || u.type === 'program_owner' ){
          props.props.showConversation(u)
             
        }else{
          set_error('هذا المستخدم ممنوع من ارسال او استقبال رسائل خاصة')
          set_user_error(true)
        }
       }else{
        set_error('هذا المستخدم لا يمكنه استقبال رسائل خاصة')
        set_user_error(true)

       }
     }} title="محادثة خاصة " titleStyle ={{fontSize: 13}} style ={{height:40}}/>
     <Divider />
     </> : '' }

      <Menu.Item onPress={() => dispatch(set_mention(`${u.name} ,`))} title={u.name + ','}  titleStyle ={{fontSize: 13}} style ={{height:40}}/>
      
      <Divider />

      {(permissions.block_device || me.program_owner) && (positions[me.type] > positions[u.type] )  ? 
      <>
      <Menu.Item onPress={() => onBlockDevice(u.device  , u.ip_country, u.name, u.type, u._id , u.ip )} title="حظر " titleStyle ={{fontSize: 13}} style ={{height:40}} />
      
      <Divider />
      </> : ''}

      {( me.program_owner) && (positions[me.type] > positions[u.type] ) ? 
      <>
         <Menu.Item onPress={() => onBlockServer(u.device  ,u.ip_country, u.name, u.type, u._id , u.ip)} title="حظر سيرفر" titleStyle ={{fontSize: 13}} style ={{height:40}} />
      
      <Divider />
      </>
    :''}

   
   {(permissions.kick_out || me.program_owner) && (positions[me.type] > positions[u.type]) ? 
   <>
   <Menu.Item onPress={() => kick_out(u._id , u.name)} title="طرد" titleStyle ={{fontSize: 13}} style ={{height:40}}/>
      
      <Divider /></>: ''}

      {(permissions.stop || me.program_owner) && (positions[me.type] > positions[u.type]) && !isStopped(u) ?  
      <>

<Menu.Item onPress={() => {
  setVisible(false)
  set_stop_modal(true)
  set_stop_user(u)
}}
   title="ايقاف"  titleStyle ={{fontSize: 13}} style ={{height:40}}/>
      <Divider />

      </>:''}

      {
        (permissions.stop || me.program_owner) && (positions[me.type] > positions[u.type]) && isStopped(u) ?
        <>
          <Menu.Item onPress={() => cancel_stop(u)} title="الغاء ايقاف"  titleStyle ={{fontSize: 13}} style ={{height:40}}/>
      <Divider />
        </>
        :''
      }
    

    

      <Menu.Item onPress={() => on_ignore(u._id)} title={ignored.includes(u._id) ? 'الغاء التجاهل' : "تجاهل"} titleStyle ={{fontSize: 13}}  style ={{height:40}}/>
      </Menu>
      
      </View>
      
      <Divider/>
</View>
          ))}


       

          
        </View>
    )
}

