import * as React from 'react';
import { View , Image,  TouchableOpacity } from 'react-native';
import { Menu, Divider, } from 'react-native-paper';
import menu from '../../assets/menu.png'
import State_menu from './state';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/user';
import {set_msgs} from '../../reducers/room'
import socket from '../../socket';

const Room_menu = (props) => {
  const [visible, setVisible] = React.useState(false);
  let dispatch = useDispatch()

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  let me = useSelector(state => state.user.me)
  let room =useSelector(state => state.rooms.room)

  const out = () => {
    dispatch(logout())
    props.navigation.goBack()
  }

  const delete_room_chat = () => {
    let id = room._id
    let body ={roomId: id , name: me.name}
    socket.emit('deleteRoomChat', body ) 
  }


  let permissions = me.permissions || {}

  return (
    <View>

      <Menu 
        contentStyle={{backgroundColor: 'gray' , alignItems: 'flex-end', marginTop: 40}}
        titleStyle={{color: 'white'}}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<TouchableOpacity onPress={openMenu}>
          <Image source={menu} style={{ marginHorizontal: 10 }} />
        </TouchableOpacity>}>

       <State_menu/>
        <Divider style={{width: '90%', alignSelf: 'center'}} />

        <Menu.Item onPress={() => {
          closeMenu()
          props.navigation.navigate('settings')
        }} title="الاعدادات" titleStyle={{color: 'white', textAlign: 'right'}} />
        <Divider  style={{width: '90%', alignSelf: 'center'}}/>

        <Menu.Item onPress={() => dispatch(set_msgs([]))} title="مسح النص" titleStyle={{color: 'white', textAlign: 'right'}} />

        <Divider style={{width: '90%', alignSelf: 'center'}} />

        {permissions.remove_msgs || me.type === 'program_owner' ? 
        <>

<Menu.Item onPress={() => delete_room_chat()} title="مسح النص للجميع" titleStyle={{color: 'white', textAlign: 'right'}} />
        <Divider style={{width: '90%', alignSelf: 'center'}}/>
        </> : ''}
       
       
       {me.type !== 'member' && me.type !== 'visitor'? 
       <>
        <Menu.Item 
        onPress={() => {
          closeMenu()
          props.navigation.navigate('room_settings')
        }}
         title="ادارة الغرفة" titleStyle={{color: 'white', textAlign: 'right'}} />
        <Divider style={{width: '90%', alignSelf: 'center'}}/>
       </> 
       : ''}

       {me.name_type === 'royal' || me.name_type === 'protected' ? 
       <>
        <Menu.Item onPress={() =>{
          closeMenu()
           props.openProfile(me)
        }} title=" الملف الشخصي" titleStyle={{color: 'white', textAlign: 'right'}} />
        <Divider style={{width: '90%', alignSelf: 'center'}} />
        
        <Menu.Item 
        onPress={() => {
          closeMenu()
          props.navigation.navigate('Account_Edit')
        }}
         title="تعديل الملف"  titleStyle={{color: 'white', textAlign: 'right'}}/>
        <Divider style={{width: '90%', alignSelf: 'center'}}/>
        
        <Menu.Item  onPress={() => {
          closeMenu()
          props.navigation.navigate('background')
        }} title=" تغيير خلفية الملف  " titleStyle={{color: 'white', textAlign: 'right'}} />
        
        </> : ''}
        
       

        <Divider style={{width: '90%', alignSelf: 'center'}} />
        <Menu.Item onPress={() => {}} title="عن البرنامج"  titleStyle={{color: 'white', textAlign: 'right'}}/>

        <Divider style={{width: '90%', alignSelf: 'center'}}/>
        <Menu.Item onPress={out} title=" خروج"  titleStyle={{color: 'darkred', textAlign: 'right'}}/>
     
      </Menu>
    </View>
  );
};

export default Room_menu;