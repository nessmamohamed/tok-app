import * as React from 'react';
import { View , Image,  } from 'react-native';
import { Button, Menu, Divider,  } from 'react-native-paper';
import sleep from '../../assets/sleep.png'
import out from '../../assets/out.png'
import busy from '../../assets/busy.png'
import call from '../../assets/phone.png'
import food from '../../assets/food.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

import socket from '../../socket'
import { useSelector } from 'react-redux';



const State_menu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  let me = useSelector(state => state.user.me)
  let room = useSelector(state => state.rooms.room)


  const  onChangeState = async (state, e) => {

    await AsyncStorage.setItem('state', JSON.stringify(state))

    socket.emit('state' , {state, userId: me._id , roomId: room._id})
    closeMenu()

   }



  return (
    <View>
      <Menu 
        contentStyle={{backgroundColor: 'gray' , alignItems: 'flex-end'}}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu} labelStyle={{color: 'white'}}>الحالة</Button>}>

        <Menu.Item onPress={() => onChangeState('available')} title="متاح"  titleStyle={{color: 'white', textAlign: 'right',}} />
        <Divider style={{width: '90%', alignSelf: 'center'}} />

        <Menu.Item onPress={() => onChangeState('out')} title="بالخارج" 
          trailingIcon={() => <Image source = {out} style ={{width: 22, height: 22}} />}
         titleStyle={{color: 'white', textAlign: 'right', marginHorizontal: 10}} />
      
      <Divider style={{width: '90%', alignSelf: 'center'}} />


      <Menu.Item onPress={() => onChangeState('busy')} title="مشغول" 
          trailingIcon={() => <Image source = {busy} style ={{width: 22, height: 22}} />}
         titleStyle={{color: 'white', textAlign: 'right', marginHorizontal: 10}} />

        <Divider style={{width: '90%', alignSelf: 'center'}} />


        <Menu.Item onPress={() => onChangeState('call')} title="هاتف" 
          trailingIcon={() => <Image source = {call} style ={{width: 22, height: 22}} />}
         titleStyle={{color: 'white', textAlign: 'right', marginHorizontal: 10}} />

        <Divider style={{width: '90%', alignSelf: 'center'}} />

        <Menu.Item onPress={() => onChangeState('eating')} title="طعام" 
          trailingIcon={() => <Image source = {food} style ={{width: 22, height: 22}} />}
         titleStyle={{color: 'white', textAlign: 'right', marginHorizontal: 10}} />

        <Divider style={{width: '90%', alignSelf: 'center'}} />

        <Menu.Item onPress={() => onChangeState('sleeping')} title="نائم" 
          trailingIcon={() => <Image source = {sleep} style ={{width: 22, height: 22}} />}
         titleStyle={{color: 'white', textAlign: 'right', marginHorizontal: 10}} />


     
      </Menu>
    </View>
  );
};

export default State_menu;