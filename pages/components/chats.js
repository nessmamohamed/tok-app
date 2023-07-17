import React from 'react';
import { View } from 'react-native';
import { Text, Divider, Button, TouchableRipple } from 'react-native-paper';
import users from '../../assets/users.png'
import { Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { set_conversations } from '../../reducers/room';

export default function Chats(props) {

   let dispatch = useDispatch()

  let conversations = useSelector(state => state.rooms.conversations)
  let onlineUsers = props.route.params.onlineUsers

  let get_friend = (id ) =>{
    let friend = onlineUsers.filter(u => u._id === id)
    return friend[0]
  }

  let me = useSelector(state => state.user.me)

  let delete_conv =(friend_id) => {
    let new_convs = conversations.filter(c => c.friend_id !== friend_id)
     dispatch(set_conversations(new_convs))
  }
 
  return (
    <View style ={{backgroundColor: '#91d9e8'}}>
   
        <View 
        style={{ padding: 20 , height: '100%', 
         borderTopLeftRadius: 50, borderTopRightRadius: 50 , backgroundColor: 'white',
         justifyContent: 'flex-start', alignItems: 'flex-end'}}
        >

<TouchableRipple onPress  = {() =>{ props.navigation.navigate('chat')}} style ={{width: '100%'}} >
<View>
<View style ={{flexDirection: 'row' , paddingVertical: 10}}>
  

  <View style ={{alignItems: 'flex-end', marginHorizontal: 20, justifyContent: 'center', flex: 2}}>
  <Text variant='titleMedium'> الكل</Text>
  <Text style ={{color: 'gray'}} > العودة الي الشات الرئيسي  </Text>
  </View>
  
  <View style ={{height: 60, width: 60 , backgroundColor: 'aliceblue', justifyContent: 'center', alignItems: 'center',
         borderRadius: 20}}>
  <Image source = {users} />
  </View>
  </View>
  <Divider style ={{width: '90%', alignSelf: 'center'}} />
</View>

</TouchableRipple>


    {/**users msgs -------------------------------------------------------- */}
 {conversations.map((c, key) => (
     <TouchableRipple key ={key} onPress  = {() => {
      props.navigation.navigate('private_chat', {user: get_friend(c.friend_id)})
      }} style ={{width: '100%'}} >
  <View>
      
  <View style ={{flexDirection: 'row' , paddingVertical: 10}}>
    
    <View style ={{justifyContent: 'center'}}>
    <Button labelStyle ={{color: 'red', fontWeight: 'bold'}} onPress={() => delete_conv(c.friend_id)}>x</Button>
    </View>
    
    <View style ={{alignItems: 'flex-end', marginHorizontal: 20, justifyContent: 'center', flex: 2}}>
    <Text variant='titleMedium'> {c.friend_name}</Text>

  <View style ={{flexDirection: 'row-reverse', alignItems: 'center'}}>
  {c.msgs[c.msgs.length - 1].sender_id === me._id ? 
  <Ionicons name="checkmark-done" size={16} color="#FF9900" style ={{fontWeight: 'bold'}} />  : ''}
    <Text style ={{color: 'gray', marginHorizontal: 5}} > 

    {c.msgs ? c.msgs[c.msgs.length - 1].text : ''}
     </Text>
  </View>

    </View>
    
    <View style={{justifyContent:'center'}} >

    <Image source = {{uri : c.friend_icon}} style={{width: 30 , height: 30}} />
    </View>
    </View>
    <Divider style ={{width: '90%', alignSelf: 'center'}}/>
  </View>
  
  </TouchableRipple>
 ))}

          
        </View>
  
  </View>
  );

}