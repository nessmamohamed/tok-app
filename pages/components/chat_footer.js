import { useEffect, useState } from "react";



import {View, Pressable , Keyboard} from "react-native";

import { Image } from "react-native";

import { Styles } from "../../styles/style";
import {REACT_APP_URL} from '@env'


import mic from '../../assets/mic.png'
import gallery from '../../assets/gallery.png'
import face from '../../assets/face.png'
import send from '../../assets/send.png'
import { TextInput } from "react-native-paper";
import Emojie_pick from './emojie_pick'
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import pic from '../../assets/picture.png'
import camera from '../../assets/photo.png'


import React from 'react'
import { Text } from "react-native";
import axios from "axios";
import { set_mention } from "../../reducers/room";
import Voice from "./voice";

export default function Chat_footer (props) {

  const [open, setOpen] = useState(false);
  const [text, set_text] = useState('');
  const [user_info_error, set_user_error] = useState(false) 
  const [error , set_error] = useState('')
  const [choose , set_choose] = useState(false)
  let me = useSelector(state => state.user.me)
  let room = useSelector(state => state.rooms.room)
  let mention = useSelector(state => state.rooms.mention)
  let page = props.page
  let friend = props.friend
  let room_stopped = useSelector(state => state.rooms.room_stopped)
  let my_device = useSelector(state => state.user.device)


  const [msgs, setMsgs] = useState(false)
  let current_conversation = useSelector(state => state.rooms.current_conversation)
   
  let all_msgs = msgs || current_conversation.msgs || []

  let dispatch = useDispatch()
 
  useEffect(() => {

    setMsgs(current_conversation.msgs)

   }, [current_conversation])

   useEffect(() => {
    if(mention){
      set_text( text + mention)
      dispatch(set_mention(false))
    
    }
   }, [mention]);

  const closeErrorMenu = () => set_user_error(false);

  

  const toggleEmojie = () => {
   
    if(Keyboard.isVisible()){
      Keyboard.dismiss()

      setTimeout(() => {
        setOpen(!open)
      }, 100);
    }else{
      setOpen(!open)
    }
    
  }


 
  let amStopped= () =>{
    let isExist = room_stopped.filter(s => JSON.stringify(s.device) === JSON.stringify(my_device))
     
    if(isExist[0] && me.type !== 'program_owner'){

      return isExist[0]
    }else{
      return false
    }
  }

let isStopped =  () =>{

let isExist = room_stopped.filter(s => JSON.stringify(s.device) === JSON.stringify(friend.device))
 
if(isExist[0] && friend.type !== 'program_owner'){

  return isExist[0]
}else{
  return false
}
}  




  const handleOnEnter = async () => {
    let color = await AsyncStorage.getItem('color') 
    this.myTextInput.clear()
    set_text('')
    
      if(page === 'private'){

          if(!amStopped.private_msgs){
         
            
            if(!isStopped.private_msgs){

              console.log(all_msgs)
           
                let msg = {text, type: 'text', sender_id: me._id , name_type: me.name_type , color: color || 'black'}
                let data = {friend_id: friend._id, friend_name: friend.name, friend_icon: friend.icon , 
                            sender_id: me._id, sender_name: me.name, sender_icon: me.icon, 
                            msgs: [...all_msgs, msg]}
                
                if(text.length > 0){
                socket.emit('send_msg_private', data)
    
                
              }
            }else{
              set_error('هذا المستخدم ممنوع من ارسال او استقبال رسائل خاصة')
             set_user_error(true)
            }
         

          }
         
      }else{

     
         if(!amStopped.msgs){
            let id = me._id
            let name = me.name
            let icon  = me.icon
            let room_id = room._id
            let msg = text
          
    
            let data = {id , name, icon , room_id, msg , name_type : me.name_type , color : color || 'black'}    
            
           if(text.length > 0){
            socket.emit('send_msg', data)
           }
          } 
        }
      
  }


  const handleChoosePhoto = async() => {
    
   if((!amStopped.msgs && page !== 'private') || (!amStopped.private_msgs) && page === 'private'){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 1],
      quality: 1,
      
    });

    
    if (!result.canceled) {

      on_send(result.assets[0].uri)

    }
   }
  };

  const handleOpenCamera = async() => {
    
    if((!amStopped.msgs && page !== 'private') || (!amStopped.private_msgs) && page === 'private'){
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 1],
        quality: 1,
        
      });
  
      
      if (!result.canceled) {
        on_send(result.assets[0].uri)
      }
    }
  };

  const on_send =(photo) => {

    const formData = new FormData();
    
    let localUri = photo ;
    let filename = localUri.split('/').pop()     
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append('file', { uri: localUri, name: filename, type });

    axios.post(`${REACT_APP_URL}/upload`, formData, 
    { headers: {
      'Content-Type': 'multipart/form-data'
    }})
    .then(res => {
      const  {filePath, fileName} = res.data
       console.log(filePath)
      if(filePath){
        if(page === 'private' ){

          let msg = {filePath, type: 'file', sender_id: me._id , name_type: me.name_type}
          let data = {friend_id: friend._id, friend_name: friend.name, friend_icon : friend.icon, 
                      sender_id: me._id, sender_name: me.name, sender_icon: me.icon, 
                      msgs: [...all_msgs, msg]}
          
          socket.emit('send_msg_private', data)

        }else{
          let id = me._id
          let name = me.name
          let icon  =  me.icon
          
         

          socket.emit('send_file', {
              id, name, icon, room_id: room._id, filePath , name_type :me.name_type 
          })
        }
      }
    })

  }



    return(
  


<View >


{choose ? 
  <View  style ={{  backgroundColor: 'white', position: 'absolute', top: -105, left: 10 , zIndex: 2,
borderRadius: 5 , elevation: 10, shadowColor: 'gray' , shadowOpacity: 0.5 , 
flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
  <Pressable onPress={handleChoosePhoto} style={{alignItems: 'center', width: 100 , margin: 3 , backgroundColor: 'aliceblue', padding: 10}}>
    <Image source={pic} style={{marginBottom: 15}}/>
    <Text>ارسال صورة</Text>
  </Pressable>

  <Pressable onPress={handleOpenCamera} style={{alignItems: 'center', width: 100, margin: 3, backgroundColor: 'aliceblue', padding: 10}}>
    <Image source={camera} style={{marginBottom: 10}}/>
    <Text>كاميرا </Text>
  </Pressable>
</View> : ''}
          
<View style={{...Styles.room_header , height: 75       }}>
  
  
<View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
          {page !== 'private' ? 
          <>
         <Voice/>

<View style={Styles.side_border}></View>

{/**
 * <Image source={cam} style={{ marginHorizontal: 5 }} />
<View style={Styles.side_border}></View>
 */}
</> : ''}

         <Pressable onPress={() => set_choose(!choose)}>
         <Image source={gallery} style={{ marginHorizontal: 5 }} />
         </Pressable>


        </View>

        {/**text_input */}
       
       <Pressable onPress = {() => {
        setOpen(false)
        setTimeout(() => {
          this.myTextInput.focus()
        }, 200);
       }}  
        style={{
          flex: 2, alignItems: 'center', borderRadius: 15, overflow: 'hidden'
          , marginHorizontal: 5
        }}>
       <View 
           pointerEvents="none"
           style={{ width: '100%', height: 45 }}>

          <TextInput
           ref={(ref)=>{this.myTextInput = ref}}
           style={{ width: '100%', height: 45 }}
            activeUnderlineColor="transparent"
            underlineColor='transparent'
            backgroundColor='white'
            onChangeText={(t) => set_text(t)}
            value={text}
             />
        </View>

       </Pressable>

        <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center', }}>

          <Pressable onPress={toggleEmojie}>
            <Image source={face} style={{ marginHorizontal: 5 }} />
          </Pressable>

          <View style={Styles.side_border}></View>
         <Pressable onPress={handleOnEnter}>
         <Image source={send} style={{ marginHorizontal: 5 }} />
         </Pressable>
        </View>


</View>

    
      { open ?
         
           <Emojie_pick />
       
          : ''}
        </View> 

    )
}