import {View, Image, ScrollView} from 'react-native'
import { Button, Card, Divider, Menu, RadioButton, Text , Snackbar} from 'react-native-paper'

import info from '../../assets/info_.png'

import folder from '../../assets/folder.png'
import user from '../../assets/user_.png'
import clock from '../../assets/clock.png'
import location from '../../assets/location.png'
import React from 'react'


import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { delete_block_device } from '../../reducers/room'


export default function Blocked () {

  let blocked = useSelector(state => state.rooms.blocked_devices)
  let room = useSelector(state => state.rooms.room)
  let dispatch = useDispatch()
  

  let devices = blocked.filter(b => b.room === room._id)

  const blocked_ips = devices.filter(user => user.ip)
  const blocked_devices = devices.filter(user => user.device)
    
  const [visible, setVisible] = React.useState(false);
  const [block_type, set_block_type] = React.useState('ips');
  const [snack , set_snack] =  React.useState('')

  const [ id , set_id] = React.useState('')


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


let list = block_type === 'ips' ? blocked_ips : blocked_devices

const hideSnack = () => set_snack(false)

    return(
       <View style ={{height: '100%'}}>
         <ScrollView style ={{flex : 2}}>
        {list.map((b, key ) => (
            <Card key ={key} style ={{backgroundColor: 'white', width: '95%', alignSelf : 'center' , marginVertical: 10}}>
            <Card.Content style={{alignItems: 'flex-end'}}>
         <View style ={{flexDirection: 'row' ,justifyContent: 'space-between', width: '100%', 
      alignItems: 'center'}}>
  
  
         <View >
          <Menu
            visible={visible && id === b._id}
            onDismiss={closeMenu}
            contentStyle={{backgroundColor: 'aliceblue'}}
            anchor={<Button onPress={() => openMenu(b._id)}>
              <Entypo name="dots-three-vertical" size={15} color="black" />
            </Button>}>
            <Menu.Item onPress={() => {

              dispatch(delete_block_device({id: b._id, set_snack}))

            }} title="الغاء الحظر " />
        
          </Menu>
          </View>
  
  
  
         <View style ={{flexDirection: 'row', }}>
          <Text  style={{marginHorizontal: 5}}> {b.name} </Text>
          <Image source = {user} style={{width: 18, height: 18}}/>
  
        </View>
  
  
         </View>
  
  
        <View style ={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{marginHorizontal: 5}}>   {b.blocked_by} : محظور من </Text>
          <Image source = {info} style={{width: 20, height: 20}}/>
  
        </View>
       
  
       <View style ={{width: '100%', marginVertical: 10}}>
        <Divider/>
       </View>
  
  
       <View style ={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
          <Text variant='bodySmall' style={{marginHorizontal: 5}}> {b.country} </Text>
          <Image source = {location} style={{width: 18, height: 18}}/>
  
        </View>
  
       <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', 
                    }}>
        
        <View style ={{flexDirection: 'row', }}>
          <Text variant='bodySmall' style={{marginHorizontal: 5}}>{date(b.blocked_date)} - {time(b.blocked_date)}</Text>
          <Image source = {clock} style={{width: 18, height: 18}}/>
  
        </View>
  
       
  
       <View style ={{flexDirection: 'row', }}>
          <Text variant='bodySmall' style={{marginHorizontal: 5}}> {b.dummy_ip} </Text>
          <Image source = {folder} style={{width: 18, height: 18}}/>
  
        </View>
  
        
       </View>
      </Card.Content>
            </Card>
        ))}




          
        </ScrollView>

        <Snackbar
          style={{ width: '95%', marginBottom: 100}}
        visible={snack}
        icon={() => <Entypo name="check" size={24} color="#9DCFE2" />}
        onIconPress={() => hideSnack()}
        duration={1000}
        onDismiss={hideSnack}
      >
      تم الغاء حظر المستخدم
      </Snackbar>
        
        <View >

            <Divider/>
        <RadioButton.Group value={block_type} >
      <RadioButton.Item label="حظر ايبي" value='ips' mode='android' position='leading' color='#8CA8F5' uncheckedColor='#8CA8F5' onPress={()=>set_block_type('ips')}/>
      <RadioButton.Item label="حظر جهاز" value="device" mode='android'position='leading' color='#8CA8F5' uncheckedColor='#8CA8F5' onPress={() => set_block_type('device')}/>
    </RadioButton.Group>
    </View>

       </View>
    )
}