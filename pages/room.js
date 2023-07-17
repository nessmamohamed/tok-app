import { View, Text, Image, StatusBar, Pressable} from 'react-native'
import group from '../assets/group.png'
import sound from '../assets/sound.png'
import msgs_ from '../assets/comment.png'

import Chat from './components/chat'
//drawer
import {
  createDrawerNavigator, DrawerContentScrollView,

} from '@react-navigation/drawer';

import React from 'react'
import { Styles } from '../styles/style'
import Room_menu from './menus/room_menu'


import Visitors from './components/visitors'
import Chats from './components/chats'
import Private_Chat from './components/private_chat'
import { useDispatch, useSelector } from 'react-redux'
import { get_history, getMasterReports, getRoomFetch, set_conversations, set_msgs, set_room_stopped } from '../reducers/room'
import { useEffect } from 'react'
import { getRoomUsers, logout } from '../reducers/user'
import { set_current } from '../reducers/room'
const Drawer = createDrawerNavigator();

import socket from '../socket'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {  getCalendars } from 'expo-localization';
const ct = require('countries-and-timezones');

import dot from '../assets/dot.gif'
import User_info_error from './models/user_info_error'
import Alert from './models/alert'
import Profile_view from './models/profile_view'
import Chat_footer from './components/chat_footer'
import { KeyboardAvoidingView } from 'react-native'

function Content(props) {



  return (
    <DrawerContentScrollView {...props} style ={{ padding: 0}}>
      <Visitors props ={props}/>

    </DrawerContentScrollView>
  );
}





export default function Room(props) {
 
 let params = props.route.params
 let room_id = params.room_id
 const [onlineUsers, setOnlineUsers] = useState([])
 const [state, set_state] = useState('available')
 const [private_msgs, set_private] = useState(false)
 const [newprivate, setNewPrivate] = useState(false)
 const [newMsg, setNewMsg] = useState(false)
 const [ignored , setIgnored] = useState([])
 const [unread , set_urnread] = useState([])
 const [user_info_error, set_user_error] = useState(false) 
  const [error , set_error] = useState('')
  const [alert , set_alert] = useState()
  const [alert_type , set_alert_type] = useState('')
  const [stop_data , set_stop_data] = useState({})
  const [profile_modal, set_profile_modal] = useState(false);
  const [user_info, set_user_info] = useState({}) 


 let me = useSelector(state => state.user.me)
 let room =useSelector(state => state.rooms.room)
 let device = useSelector(state => state.user.device)
 let ip = useSelector(state => state.user.ip)
 let room_stopped = useSelector(state => state.rooms.room_stopped)
 let calender = getCalendars() || []
 let timeZone = calender[0].timeZone
 let country = ct.getCountryForTimezone(timeZone) || {}
 let current_conversation = useSelector(state => state.rooms.current_conversation)
 let conversations = useSelector(state => state.rooms.conversations)
 let msgs = useSelector(state => state.rooms.msgs)
  let dispatch = useDispatch()

  const closeErrorMenu = () => set_user_error(false);
  const closeAlert = () => set_alert(false)
  const closeProfile = () => {
    set_user_info({})
    set_profile_modal(false);
  }
  const openProfile = (u) =>{ 
    set_user_info(u)
    set_profile_modal(true);
  }

useEffect(() => {
  getStorage()

  dispatch(getRoomFetch({room_id}))
  dispatch(getRoomUsers(room_id))
  dispatch(getMasterReports(room_id))
  dispatch(get_history(room_id))
   

  socket.on(`room-stopped/${room_id}` , (data) =>{
    dispatch(set_room_stopped(data))


  })



  socket.on(`new_msg/${room_id}`, (data) => {
      console.log({new: data})
    if(!ignored.includes(data.sender)){
      setNewMsg( data)
    }
    })

    socket.on('public-msg' , data => {
      console.log(data)
      setNewMsg(data)
    
  })

  socket.on(`deleteRoomChat/${room_id}`, () => {
    dispatch(set_msgs([]))
  })


}, []);


useEffect(()=>{
  if(newMsg){

   let messeges = msgs || []
   
   dispatch(set_msgs([...messeges, newMsg]))

  }
 },[newMsg])


  //-----------------------------getusers
socket.on(`getUsers/${room_id}`, (data) =>{
  setOnlineUsers(data )
 }) 





useEffect(() => {
  

  //-------------------------------------adduser
  if (me && room) {

  socket.emit('addRoom', room_id)

    let body = {
      ...me,
      ip,
      room_id,
      device,
      room_country: room.country,
      state,
      private_msgs,
      ip_country : country.name
    }


    socket.emit('addUser', (body))

    //private msg 
    socket.on(`getMessageApp/${me._id}`, (data) => {
      
      //edit private_msg false
      if ((ignored.includes(data.friend_id) || !private_msgs ) && data.msgs[data.msgs.length - 1].sender_id !== me._id) {
        setNewMsg({ msg_type: 'request', name: data.friend_name })
          

      } else {
        setNewPrivate(data)

      }

    })


       
    socket.on(`block-alert/${room_id }`, (data) => {
                  
       if((data.ip === ip || JSON.stringify(data.device) === JSON.stringify(device) )
        &&  me.type !== 'program_owner'){
         set_alert_type('out')
         set_alert(true)

         setTimeout(() => {
          dispatch(logout())
           props.navigation.navigate('Main')
         }, 5000);
       }
      
     })


     socket.on(`block-alert`, (data) => {
                  
      if((data.ip === ip || JSON.stringify(data.device) === JSON.stringify(device) )
        &&  me.type !== 'program_owner'){
         set_alert_type('out')
         set_alert(true)

         setTimeout(() => {
          dispatch(logout())
           props.navigation.navigate('Main')
         }, 5000);
       }

     })


     socket.on(`new-stop/${room_id}`, data =>{
      let isExist = JSON.stringify(data.device) === JSON.stringify(device) 
        
      dispatch(set_room_stopped([...room_stopped, data]))
      console.log(room_stopped)
    
        if(me){
          if(me.type !== 'program_owner'){
     
      
            if(isExist){
              set_alert_type('stop')
              set_alert(true)
              set_stop_data(data)
            }

            if(data.private_msgs  && myRef.getState().index === 2){
             props.navigation.goBack()
            
         
          }
        }
      }


    })


    socket.on(`kick-out-alert/${me._id}`, () => {
      set_alert_type('warning')
      set_alert(true)

      setTimeout(() => {
       dispatch(logout())
        props.navigation.navigate('Main')
      }, 5000);
    
    })


    socket.on(`cancel-stop/${room_id}`, data =>{
      let isExist = JSON.stringify(data.device) === JSON.stringify(device) 
        
    
        if(me){
          if(me.type !== 'program_owner'){
          
            if(isExist){
              dispatch(set_room_stopped(room_stopped.filter(r => JSON.stringify(r.device) === JSON.stringify(device)  )))
              set_alert_type('cancel')
              set_stop_data(data)
              set_alert(true)
            }
        }
      }

    })

  }
}, [me , room]);


useEffect(() => {

  let data = newprivate


if(newprivate){

      //update current conv
      if(current_conversation){
        if(data.friend_id ===current_conversation.friend_id){
            dispatch(set_current(data))
        }
    }
         //update msgs
        let isExist = conversations.filter(p => p.friend_id === data.friend_id)[0]
        if(isExist ){

         let indx = conversations.indexOf(isExist)
          let new_msgs = conversations
          new_msgs[indx].msgs = data.msgs
          
           dispatch(set_conversations([...new_msgs]))
           
           let my_current_conversation = current_conversation || ''
           let msgs = data.msgs[data.msgs.length -1]
           
          if(msgs.sender_id !== me._id && (my_current_conversation.friend_id !== data.friend_id || myRef.getState().index !== 2)){
           set_urnread([...unread, data.friend_id])
          }

        }else if(!isExist){

          if(conversations.length > 9){
            data = {to: newprivate.friend_id}
             socket.emit('private-limit', data )

          }else{
             
            dispatch(set_conversations([...conversations, data]))

                
           let my_current_conversation = current_conversation || ''
           let msgs = data.msgs[data.msgs.length -1]
           

          if(msgs.sender_id !== me._id && (my_current_conversation.friend_id !== data.friend_id ||  myRef.getState().index !== 2)){
             
           set_urnread([...unread, data.friend_id])
          }
       
          }
        }


    
}



      
  }, [newprivate])

const getStorage = async() => {
  let state_ = await AsyncStorage.getItem('state') || 'available'
  let private_msgs_ = await AsyncStorage.getItem('private') || false
  let unparsed_ignored = await AsyncStorage.getItem('ignored') 
  let ignored = JSON.parse(unparsed_ignored) || []

  set_state(state_)
  set_private(private_msgs_)
  setIgnored(ignored)
}






  let myRef = React.useRef()



  const handleMsgs = () => {
    myRef.navigate('chats', { onlineUsers: onlineUsers})
    set_urnread([])
  }


  const showConversation =(u) => {
             
    //check if exist
    let isExist = conversations.filter(p => p.friend_id === u._id)[0]

    if(isExist){
        dispatch(set_current(isExist))
      props.navigation.navigate('private_chat', {user: u, current_conversation })

    }else{

     if(conversations.length >10){

      set_error('لقد وصلت للحد الاعلي للرسائل')
             set_user_error(true)
      
     }else{
      let data = {friend_id: u._id, friend_name: u.name, friend_icon: u.icon  , msgs : []}

      dispatch(set_current(data))

      props.navigation.navigate('private_chat', {user: u, current_conversation,})
     }
        
    }
    
}



  return (

    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={Styles.room_container}>

      <StatusBar />

  
      {room && me? <>

      
  
      {/**header ---------------------------------------------------------- */}
      <View style={Styles.room_header}>


        


        <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>

          <Pressable onPress={() => myRef.toggleDrawer()}>
            <Image source={group} style={{ marginHorizontal: 10 }} />
          </Pressable>

          <View style={Styles.side_border}></View>

          <Image source={sound} style={{ marginHorizontal: 10 }} />

          <View style={Styles.side_border}></View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Mic - Free</Text>
          <Text style={{ color: 'white' }}>-- : --</Text>
        </View>


        <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center', }}>
          <View style={Styles.side_border}></View>

          <Pressable onPress = {handleMsgs}>
          <Image source={msgs_} style={{ marginHorizontal: 10 }} />
          {unread[0] ? 
      <Image source={dot} style ={{width: 22, height: 22, borderRadius: 25 , position: 'absolute', right: 0, top : -8}}/>
     : ''}
          </Pressable>
          

          <View style={Styles.side_border}></View>
        
          <Room_menu navigation ={props.navigation} openProfile={openProfile}/>

        </View>

      </View>



      {/**-----------------------------------------------------------------------------------------chat */}


      <User_info_error error ={error} 
                   closeErrorMenu ={closeErrorMenu}
                   user_info_error ={user_info_error}/>

                   <Alert alert={alert} 
                          closeAlert={closeAlert}
                          navigation = {props.navigation}
                          alert_type={alert_type}
                          stop_data = {stop_data}/>

                          
          <Profile_view visible = {profile_modal}
           closeProfile = {closeProfile} 
          openProfile = {openProfile}
          user_info = {user_info}
          />


<KeyboardAvoidingView style ={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
<View style={{ flex: 2, backgroundColor: 'white' }}>
  
        {/**drawer */}
        <Drawer.Navigator
          useLegacyImplementation
          screenOptions={{ drawerType: 'slide', swipeEdgeWidth: 1000, headerShown: false }}

          drawerContent={(props) => <Content onlineUsers={onlineUsers} room_stopped= {room_stopped}
           {...props} showConversation= {showConversation}  />}>

          <Drawer.Screen name="chat" component={Chat}

            options={({ navigation }) => {
              myRef = navigation

            }} />


<Drawer.Screen name="chats" component={Chats}/>

<Drawer.Screen name="private_chat" component={Private_Chat} />


            
        </Drawer.Navigator>

        </View>

</KeyboardAvoidingView>


 

</> : ''}


      


    
   
    </View>

  )
}