import { Pressable, View } from "react-native";

import * as React from 'react';

import { Modal, Portal, Text, Button, Menu, TextInput, Snackbar } from 'react-native-paper';
import { Styles } from "../../styles/style";

import Carousel from 'react-native-reanimated-carousel';

import { AntDesign } from '@expo/vector-icons';
import { Image } from "react-native";

import Save from '../../assets/download.png'
import Saved from '../../assets/saved.png'
import { useDispatch, useSelector } from "react-redux";
import { clear_error, loginUser } from "../../reducers/user";

import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set_conversations, set_msgs } from "../../reducers/room";
import Saved_names from "./saved_names";
import { useEffect } from "react";

export default function Login (props) {


    let room_id = props.room_id
    const [type, setType] = React.useState('visitor')
    const [indx, setIndx] = React.useState(0)
    const [name, set_name] = React.useState('')
    const [room_pass, set_room_pass] = React.useState('')
    const [name_pass, set_name_pass] = React.useState('')
    const [snack, set_snack] = React.useState(false)
    const [users_saved , set_users_saved] = React.useState([])

    const [saved_modal , set_saved_modal] = React.useState(false)


    const handle_saved_modal = () => set_saved_modal(!saved_modal)

    let ip = useSelector(state => state.user.ip)
    let device = useSelector(state => state.user.device)
    let login_error = useSelector(state => state.user.login_error)

    let regex= /[\uD800-\uDFFF]|[\u200D\uD800-\uDBFF\uDC00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDFFD\uDE80-\uDEF3\uDFF3-\uDFFF]/g
     
    let icons = [
        'https://ertqa2.s3.eu-west-1.amazonaws.com/user+(2).png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/butterfly.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/barista.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/bear.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/beard.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/bunny.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/business-man.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/butterfly-shape-from-side-view-facing-to-right.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/cat-1.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/cat.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/chinese.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/coach.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/cool.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/dancer.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/designer.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/designer-1.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/editor.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/excited.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/girl.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/graphic-designer.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/happy-face-1.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/happy-face-2.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/happy-face.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/happy.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/homeless.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/koala.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/laughing.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/man.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/model.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/muslim.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/owl.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/pastor.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/pig.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/skincare.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/skunk.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/smile-1.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/smile.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/teacher.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/trainers-1.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/trainers.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/wash-face.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/wink.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/wolf.png',
        'https://ertqa2.s3.eu-west-1.amazonaws.com/woman.png',



    ]

    let dispatch = useDispatch()

    const get_storage = async() => {

        let users = await AsyncStorage.getItem('users')
        let set = JSON.parse(users)
        set_users_saved(set)

    }

     useEffect(() => {
      get_storage()
     }, []);

    const showSnack = async() =>{
        if(name[0] ){
            let user ={name , room_password: room_pass, name_password: name_pass}
            
            let set = users_saved
            if(set[0]){
               
                let last_log = set.map((log, index) => {
                    if(log.name === name){
                      return index
                    }
                  }).filter(log => log  !== undefined)

                  if(last_log.length > 0 ){

                    set[last_log[0]] = user

                    console.log(set)
             
                    await AsyncStorage.setItem('users', JSON.stringify([...set]))
                    
             
                  }else{
                   
                    console.log(set)
                    await AsyncStorage.setItem('users', JSON.stringify([...set, user]))
             
                  }

            }else{
              await AsyncStorage.setItem('users' ,JSON.stringify([user]))
                 
            }
            set_snack(true)
        }
    }
    const hideSnack = () => set_snack(false)


    const login = () => {

        dispatch(clear_error())

        let reg = name.replace(regex, '')
        
        if(reg ){
            
        let body ={
            name: reg.trim() ,  
            room_password: room_pass,
            name_password: name_pass,
            icon : icons[indx],
            room_id,
            ip ,
            device
        }


        dispatch(loginUser({body, navigation: props.navigation, hide_modal: props.hideModal}))
        dispatch(set_conversations([]))
        dispatch(set_msgs([]))
        }

    }     

    

      const set_user = (body) =>{
        set_name(body.name)
        set_room_pass(body.room_password)
        set_name_pass(body.name_password)
      }

    
    return(
        <View >



        <Portal >
          <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={Styles.container_style}>

            
         

          <Snackbar
          style={{position: 'absolute' , bottom: -100, width: '95%'}}
        visible={snack}
        icon={() => <Entypo name="check" size={24} color="#9DCFE2" />}
        onIconPress={() => hideSnack()}
        duration={1000}
        onDismiss={hideSnack}
      >
        تم حفظ الاسم
      </Snackbar>

            <View style ={Styles.login_select}>
           
           <Pressable onPress={() => setType('visitor')}>
            <Text style ={type === 'visitor' ? {...Styles.selected_login} : ''}>زائر</Text>
           </Pressable>

           <Pressable onPress={() => setType('member')}>
           <Text style ={type === 'member' ? Styles.selected_login : ''}>عضو</Text>

           </Pressable>

           <Pressable onPress={() => setType('user')}>
           <Text style ={type === 'user' ? Styles.selected_login : ''}>مسجل</Text>

           </Pressable>

        </View>

        <View style={{flexDirection: 'row' , justifyContent: 'space-between', marginHorizontal: 20, 
                      alignItems: 'center' }}>

        <Pressable style={Styles.slick_button} onPress = {() => indx > 0 ? setIndx(indx - 1) : null}>
        <AntDesign name="caretleft" size={17} color="white" />
            </Pressable>
            <Carousel
                loop
                width={100}
                height={100}
                overscrollEnabled
                data={[...icons]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                 defaultIndex = {indx}
                renderItem={({ index }) => (
                    <View
                        style={{
                        
                            justifyContent: 'center',
                            alignItems: 'center', 
                            height: 100
                            
                        }}
                    >
                        <Image source = {{uri: icons[index]}} style ={{width: 35 , height: 35}}/> 
                    </View>
                )}
            />

<Pressable style={Styles.slick_button} onPress = {() => indx < icons.length -1 ?   setIndx(indx + 1): setIndx(0)}>
        <AntDesign name="caretright" size={17} color="white" />
            </Pressable>
        </View>


        {/** form -------------------------------- */}

       <View  style={Styles.login_input_view} >
       <TextInput
          style={{width: '100%' , alignSelf: 'center'}}
          placeholder= 'اسم المستخدم'
          activeUnderlineColor="transparent"
          underlineColor= 'transparent'
          backgroundColor='white'
          placeholderTextColor={'gray'}
          onChangeText={e => set_name(e)}
          maxLength={15}
          value={name}
          editable
    />


<Pressable style={{width : 28 , height: 28 , position: 'absolute', right: 20, bottom: 10}} onPress={()=>{
    console.log('press')
    handle_saved_modal()
}}>
             <Image source = {Save} />
              </Pressable>
 

       </View>


    

{type === 'member' || type === 'user'  ? 
 <View style={Styles.login_input_view}>
 <TextInput
          style={{width: '100%' , alignSelf: 'center'}}
          placeholder= ' كلمة مرور الغرفة'
          activeUnderlineColor="transparent"
          underlineColor= 'transparent'
          backgroundColor='white'
          placeholderTextColor={'gray'}
          onChangeText={e => set_room_pass(e)}
          value={`${room_pass.toString()}`}
          editable
          keyboardType='visible-password'

    />
 </View> : ''}
{type === 'user'  ? 

<View style={Styles.login_input_view}>
<TextInput
         style={{width: '100%' , alignSelf: 'center'}}
         placeholder= ' كلمة مرور الاسم'
         activeUnderlineColor="transparent"
         underlineColor= 'transparent'
         backgroundColor='white'
         placeholderTextColor={'gray'}
         onChangeText={e => set_name_pass(e)}
         value={`${name_pass.toString()}`}

          editable
          keyboardType='visible-password'
   />
</View>
 :''}



{login_error ? 
    <View style ={{backgroundColor: '#FFEEEE', margin: 15, }}>
<Text 
style ={{textAlign: 'center', color: 'brown', paddingVertical: 10, borderWidth: 1 ,
 borderColor: 'brown', }}>
    {login_error.msg}
 </Text>

</View> : ''}
       <View style={{flexDirection: 'row' , justifyContent: 'center', marginTop : 13, alignItems: 'center'}}>
        <Pressable onPress={showSnack}>
        <Image source = {Saved} style={{width : 28 , height: 28 ,marginHorizontal: 10 }}/>
        </Pressable>
         
        <Button mode = 'outlined' textColor="#06B2D4F0" style ={{marginHorizontal: 10, borderColor: '#06B2D4F0'}} 
         onPress = {props.hideModal}>الغاء</Button>


        <Button mode = 'contained' buttonColor="#0dcaf0c7" style ={{marginHorizontal: 10}}
         onPress = {login}>دخول</Button>



       </View>


            
          </Modal>


        </Portal>


       <Saved_names saved_modal={saved_modal} handle_saved_modal={handle_saved_modal} users_saved={users_saved} set_user={set_user}/>

      
      </View>
    )
}