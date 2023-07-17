import * as React from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { delete_user } from '../../reducers/user';
import socket from '../../socket';

const Delete_user = (props) => {
 
  let id = props.id
  let dispatch = useDispatch()
  let me = useSelector(state => state.user.me)
  let room = useSelector(state => state.rooms.room)

  const delete_accept = () => {
    dispatch(delete_user(id))
    props.handle_delete()
    socket.emit('delete-profile' , ({name: '', by: me.name, room: room._id}))
  }

  
  return (
    
      <Portal>
        <Modal visible={props.delete_modal} onDismiss={props.handle_delete} 
        contentContainerStyle ={{backgroundColor: 'white',paddingVertical: 40 ,
         alignItems: 'center'}}>
          <Text>هل انت متأكد من رغبتك في حذف هذا العضو ؟</Text>

          <View style ={{flexDirection: 'row' , }}>

            <Button mode='elevated' onPress = {delete_accept}
            labelStyle={{color: 'white'}}
             style ={{backgroundColor: '#dc3545', marginVertical: 20}}>نعم</Button>

            <Button  mode='contained' onPress = {props.handle_delete}
            style ={{backgroundColor: '#ddd', marginVertical: 20 , marginHorizontal: 10}}>لا</Button>

          </View>
        </Modal>
      </Portal>
 
  );
};

export default Delete_user;