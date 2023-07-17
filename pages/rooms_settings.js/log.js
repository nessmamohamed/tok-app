import {View, Image, ScrollView} from 'react-native'
import { Button, Card, Divider, Menu, Text , Snackbar} from 'react-native-paper'


import clock from '../../assets/clock.png'
import folder from '../../assets/folder.png'
import up from '../../assets/up-right-arrow.png'
import down from '../../assets/down-left-arrow.png'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Entypo } from '@expo/vector-icons';
import location from '../../assets/location.png'
import { block_device, delete_history } from '../../reducers/room'


export default function Log () {

  let history = useSelector(state => state.rooms.history)
  let room = useSelector(state => state.rooms.room)
  let me = useSelector(state => state.user.me)
  let dispatch = useDispatch()
  let blocked = useSelector(state => state.rooms.blocked_devices)
  let devices = blocked.filter(b => b.room === room._id)



  const [visible, setVisible] = React.useState(false);
  const [ id , set_id] = React.useState('')
  const [snack, set_snack] = React.useState(false)
  const [state , set_state] = useState('')
  

  const openMenu = (id) => {
    set_id(id)
    setVisible(true)
  };



  const closeMenu = () => setVisible(false);


  const date = (date) => {
    let newDate = new Date(date)
      
    return newDate.getUTCMonth() + 1 + '/' + newDate.getDate()
}

const time = (date) => {
    let newDate = new Date(date)

    return newDate.toLocaleTimeString() 
}


onBlockIp = ( ip, country , name , userType , user_id) => {

  let room_id = room._id
  

  let ips = devices.map(d=> d.ip)

   if(!ips.includes(ip)){
    
      let body = {ip, room: room_id , country , name , blocked_by: me.name, userType , user_id , dummy_ip: ip}
      
        dispatch(block_device({body , set_snack, set_state}))
       
   }else{

    set_state('المستخدم محظور')
    set_snack(true)
  
   }
}


onBlockDevice  = ( device, country , name , userType , user_id, ip) => {

  let room_id = room._id
  

  let alldevices = devices.map(d=> d.device)

   if(!alldevices.includes(device)){
    
      let body = {device, room: room_id , country , name , blocked_by: me.name, userType , user_id , dummy_ip: ip}
      
      dispatch(block_device({body , set_snack, set_state}))       
   }else{
  

    set_state('المستخدم محظور')
    set_snack(true)
   }
}


onBlockServer = (device, country , name , userType , user_id, ip) => {

  let server_blocked = devices.filter(d => d.room === 'all')
  let devices_block = server_blocked.map(d =>  JSON.stringify(d.device) ).filter(d => d)
  let ips = server_blocked.map(d=> d.ip)


  if(!devices_block.includes(JSON.stringify(device)) || !ips.includes(ip)){
      let body = {device, room: 'all' , country , name , blocked_by: me.name, userType , user_id , dummy_ip: ip, ip}
      dispatch(block_device({body , set_snack, set_state}))         
  }else{
    set_state('المستخدم محظور')
    set_snack(true)
  }
}


const hideSnack = () => set_snack(false)



let permissions = me.permissions || {}
let power = {program_owner: 7, root : 6 , master: 5, master_boy: 4 , master_girl : 4 , super_admin: 3, admin : 2, member: 1, visitor: 0}


    return(
       <View style ={{height: '100%'}}>
         <ScrollView style ={{flex : 2}}>
         {history.map((h, key) => (
           <Card key ={key} style ={{backgroundColor: 'white', width: '95%', alignSelf : 'center' , marginVertical: 10}}>
           <Card.Content style={{alignItems: 'flex-end'}}>
    
       <View style ={{flexDirection: 'row' ,justifyContent: 'space-between', width: '100%', 
     alignItems: 'center'}}>
 
         <View>
        {(permissions.block_device || me.program_owner ) && power[me.type] > power[h.userType] ? 
         <Menu
         visible={visible && id === h._id}
         onDismiss={closeMenu}
         contentStyle={{backgroundColor: 'aliceblue'}}
         anchor={<Button onPress={() => openMenu(h._id)}>
           <Entypo name="dots-three-vertical" size={15} color="black" />
         </Button>}>

        
         <Menu.Item onPress={() => onBlockDevice(h.device  , h.country, h.name, h.userType, h.user_id , h.ip)} title="حظر جهاز" />

         <Menu.Item onPress={() => onBlockIp(h.ip , h.country, h.name, h.userType, h.user_id)} title="حظر ايبي" />


         <Divider />

         {me.program_owner && power[me.type] > power[h.userType]  ? 
         <Menu.Item onPress={() => onBlockServer(h.device  , h.country, h.name, h.userType, h.user_id , h.ip)} title="حظر سيرفر" />
          
         : ''}
       </Menu>:''}
         </View>
       <Text >{h.name}</Text>
 
     
       </View>
 
       <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', 
                   marginTop: 10}}>
       
       <View style ={{flexDirection: 'row', }}>
         <Text variant='bodySmall' style={{marginHorizontal: 5}}> {date(h.out)} - {time(h.out)} </Text>
         <Image source = {up} style={{width: 15, height: 15}}/>
 
       </View>
 
      <View style ={{flexDirection: 'row', }}>
         <Text variant='bodySmall' style={{marginHorizontal: 5}}> {date(h.in)} - {time(h.in)} </Text>
         <Image source = {down} style={{width: 15, height: 15}}/>
 
       </View>
 
       
      </View>
       
 
      <View style ={{width: '100%', marginVertical: 10}}>
       <Divider/>
      </View>


      <View style ={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
        <Text variant='bodySmall' style={{marginHorizontal: 5}}> {h.country} </Text>
        <Image source = {location} style={{width: 18, height: 18}}/>

      </View>
 
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', 
                   }}>
       
       <View style ={{flexDirection: 'row', }}>
         <Text variant='bodySmall' style={{marginHorizontal: 5}}> {h.time} </Text>
         <Image source = {clock} style={{width: 18, height: 18}}/>
 
       </View>
 
      <View style ={{flexDirection: 'row', }}>
         <Text variant='bodySmall' style={{marginHorizontal: 5}}> {h.dummy_ip} </Text>
         <Image source = {folder} style={{width: 18, height: 18}}/>
 
       </View>
 
       
      </View>
       
     </Card.Content>
           </Card>
         ))}


          
        </ScrollView>

        <Snackbar
          style={{ width: '95%', marginBottom: 50}}
        visible={snack}
        icon={() => <Entypo name="check" size={24} color="#9DCFE2" />}
        onIconPress={() => hideSnack()}
        duration={1000}
        onDismiss={hideSnack}
      >
       {state}
      </Snackbar>


        {me.type === 'master' || me.type === 'program_owner' ? 

<Button mode='elevated'  onPress = {() => dispatch(delete_history(room._id))}
labelStyle={{color: 'white'}}
 style ={{width: 170 , marginVertical: 15 , alignSelf: 'center' , 
         backgroundColor: '#dc3545'}} >حذف السجل</Button>
         : ''
        }

     

       </View>
    )
}