import { View, ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { EvilIcons, MaterialIcons, AntDesign, FontAwesome , MaterialCommunityIcons, 
FontAwesome5} from '@expo/vector-icons';
import Delete_user from "../models/delete_user";
import { useState } from "react";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../reducers/user";

export default function Accounts (props) {
     
    const [delete_modal, set_delete_modal] = useState(false);
    const [id, set_id] = useState('');
    let dispatch = useDispatch()

    let handle_delete = (id) => {
        id ? set_id(id) : null
        set_delete_modal(!delete_modal)
    }

    let users = useSelector(state => state.user.users).filter(u => u.type !== 'root') || []
    let me = useSelector(state => state.user.me) || []

    let colors = {
        member: 'rgb(201 17 201)',
        admin: 'blue', 
        super_admin: 'green',
        master_boy: 'red',
        master: 'red',
        master_girl: '#ff45ac',
        root: "orange"
    }

    let permissions = me.permissions || []

    const edit_account = (id) => {
        
        dispatch(getUser({id , navigation: props.navigation, page: 'edit_account'}))

    }
    
    return(
        <View style ={{height: '100%'}} >

<Delete_user delete_modal = {delete_modal} handle_delete={handle_delete} id ={id}/>

<ScrollView style ={{flex : 2}}>
<View >


{users.map((user, key) => (
    
<Card key = {key} style ={{margin: 10}}>
                <Card.Content >
                    <View style ={{flexDirection: 'row' , justifyContent: 'space-between', }}>

                 { ( user.type !== 'master') && (me._id !== user._id)   ?
                  ( user.type === 'admin' && permissions.admin_control) || ( user.type === 'super_admin' && permissions.super_admin_control)
                  || ( user.type === 'member' && permissions.member_control) || ( (user.type === 'master_girl' ||  user.type === 'master_boy' )&& permissions.master_control)
                  ||  (me.type === 'master' ||  me.type === 'program_owner') ? 
                    <View style ={{ flexDirection: 'row'}}>
                    
                    <Pressable onPress= {() => edit_account(user._id)}>
                    <EvilIcons name="pencil" size={24} color="green" />
                    </Pressable>

                    <Pressable onPress= {() => handle_delete(user._id)}>
                    <EvilIcons name="trash" size={24} color="red" />
                    </Pressable>
                    </View> : <Text style ={{opacity: 0}}>-</Text>: 
                    <Text style ={{opacity: 0}}>-</Text>}

                    <View >
                    <Text style ={{color: colors[user.type], }}>{user.name}</Text>
                    </View>

                  

                    </View>

                    <View style ={{flexDirection: 'row-reverse',  marginTop: 15}}>

                    {user.permissions.block_device?                    
                     <MaterialIcons name="block" size={15}  style ={{marginHorizontal: 3}} color="black" />: ''}
                  {user.permissions.kick_out ? <AntDesign name="deleteuser" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''}
                  {user.permissions.stop ? <FontAwesome name="flash" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''}
                  {user.permissions.remove_msgs ? <MaterialCommunityIcons name="format-text" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''}
                  {user.permissions.mic ? <FontAwesome name="microphone" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''}
                  {user.permissions.public_msg ?<MaterialIcons name="message" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''}
                  {user.permissions.cancel_block ?  <FontAwesome name="refresh" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''}
                  {user.permissions.logout_history ? <AntDesign name="logout" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''}
                  {user.permissions.accounts_control? <FontAwesome5 name="users" size={15}  style ={{marginHorizontal: 3}} color="black" /> : ''} 
                  {user.permissions.master_control ? <FontAwesome name="user" size={15}  style ={{marginHorizontal: 3}} color="red" /> : ''}
                  {user.permissions.admin_control ?  <FontAwesome name="user" size={15}  style ={{marginHorizontal: 3}} color="green" /> : ''}
                  {user.permissions.super_admin_control ? <FontAwesome name="user" size={15}  style ={{marginHorizontal: 3}} color="blue" /> :''}
                  {user.permissions.member_control ? <FontAwesome name="user" size={15}  style ={{marginHorizontal: 3}} color="purple" />: ''}
                  {user.permissions.room_settings ?  <AntDesign name="setting" size={15}  style ={{marginHorizontal: 3}} color="black" /> :''}
                  {user.permissions.masters_reports?  <MaterialIcons name="menu" size={15}  style ={{marginHorizontal: 3}} color="black" /> :''}

                  

                    </View>
                </Card.Content>
            </Card>
))}
          
</View>
</ScrollView>

<Button mode='elevated' onPress={()=> props.navigation.navigate('add_account')}
        labelStyle={{color: 'black', }}
         style ={{ marginBottom: 20 , shadowOpacity: 0,
                 backgroundColor: '#fbeb58'}} >اضافة حساب +</Button>
        </View>
    )
}