import { Image, Pressable, View , } from "react-native";
import { ScrollView } from "react-native";
import { Button, Card, Divider, RadioButton, Text, TextInput , } from "react-native-paper";
import {REACT_APP_URL} from '@env'

import { Entypo } from '@expo/vector-icons';

import React from "react";

import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { edit_room } from "../../reducers/room";
import axios from "axios";
import socket from "../../socket";



export default function Settings () {

  let dispatch = useDispatch()

  const [photo, setPhoto] = React.useState(null);
  const [description, set_desc] = React.useState(null);
  const [welcome_messege, set_wel_msg] = React.useState(null);
  const [who_can_talk, set_talk] = React.useState(null)
   const [camera , set_camera] = React.useState(null)
   const [private_msg , set_private_msg] = React.useState(null)
   const [master, set_master] =  React.useState(null)
   const [admin , set_admin] = React.useState(null)
   const [visitor , set_visitor] = React.useState(null)
   const [member , set_member] = React.useState(null)
   const [super_admin , set_s_admin] = React.useState(null)
   const [success, set_success] = React.useState(false)


  let room = useSelector(state => state.rooms.room)
  let me = useSelector(state => state.user.me)
  let limit = room.talk_limit || {}

  const handleChoosePhoto = async() => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 1],
      quality: 1,
      
    });

    
    if (!result.canceled) {

      console.log(result)

      setPhoto(result.assets[0].uri)
    }
  };




  onSave = () => {

   set_success(false)
    
    let id = room._id
    let talk_limit = {master: master || limit.master ,
               member: member || limit.member  ,
               visitor: visitor || limit.visitor  ,
               admin: admin || limit.admin  ,
               super_admin: super_admin || limit.super_admin ,
                }


    if(photo){
         
      const formData = new FormData();
    
      let localUri = photo ;
      let filename = localUri.split('/').pop()     
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    
    
  
      formData.append('file', { uri: localUri, name: filename, type });
  
  
      axios.post(`${REACT_APP_URL}/upload`, formData, 
              { headers: {
                'Content-Type': 'multipart/form-data'
              }}).then(res => {
                const  {filePath, fileName} = res.data
  
          let body = { description, welcome_messege, who_can_talk, camera,                             
          talk_limit, private_msg , image : {filePath, fileName}}
  
       
        dispatch(edit_room({id, body}))
    set_success('تم تعديل الغرفة بنجاح')
    socket.emit('edit-room', ({name: me.name, room: room._id}))


          })
    }else{


  
          let body = { description, welcome_messege, who_can_talk, camera,                             
          talk_limit, private_msg , image : {filePath: false, fileName: false}}
  
  
        dispatch(edit_room({id, body}))
        set_success('تم تعديل الغرفة بنجاح')
        socket.emit('edit-room', ({name: me.name, room: room._id}))



    }
   


            
  }

  
    return(
        <View style ={{ height: '100%',   }} >
           
       <ScrollView style ={{width: '100%', flex: 2, }} showsVerticalScrollIndicator= {false}>

<View style={{alignItems: 'center', marginBottom: 30 ,}}>

  {photo || room.image ? 
  <>
   <Image src ={photo || (room.image ? room.image.filePath : '')} style ={{width: 100 , height: 100, borderRadius: 25}}/>

   <Pressable onPress = {handleChoosePhoto}>

<Entypo name="camera" size={30} color="#706D6D" />
</Pressable>

   </>
  : <>
  <Card 
  style ={{height: 100 , width: 100 , borderRadius: 25, 
  zIndex: 2, }}>

  </Card>

  <Pressable onPress = {handleChoosePhoto}>

<Entypo name="camera" size={30} color="#706D6D" />
</Pressable>

  </>}
  

</View>

       <TextInput label="وصف الغرفة" mode='outlined' value={room.description}
        outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
        onChangeText={(t) => set_desc(t)}
         />

<TextInput label=" رسالة ترحيب" mode='outlined'  multiline value={room.welcome_messege}
        outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
        onChangeText={(t) => set_wel_msg(t)}
        />
       
       <Text style={{marginTop:  20, textAlign: 'right' ,fontWeight: 'bold'}} variant="bodyMedium">من يستطيع التحدث</Text>


      <View >
      <RadioButton.Group value={who_can_talk ||  room.who_can_talk}  >
      <RadioButton.Item position='leading'  label="الجميع " value="all" mode='android' color='#8CA8F5' uncheckedColor='#8CA8F5'
      labelStyle = {{fontSize: 14}} onPress={() => set_talk('all')}  />
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}}  label=" الاعضاء و المشرفين" value="masters & members" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_talk("masters & members")}/>
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}} label="المشرفين فقط " value="masters" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_talk("masters")}/> 
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}} label="لا احد " value="no one" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_talk("no one")}/>

    </RadioButton.Group>
      </View>
        
     <View><Divider/></View>

     <Text style={{marginVertical:  20,  textAlign: 'right' ,fontWeight: 'bold' }} variant="bodyMedium">مدة  التحدث</Text>
      
  <View style={{flexDirection: 'row', width: '100%'}}>
  <TextInput label=" الزوار" mode='outlined' 
        outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
        style ={{flex: 2}}
        onChangeText={(e) => set_visitor(e)}
        keyboardType="numeric"
         />

<TextInput label=" ممبر" mode='outlined' 
        outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
        style ={{flex: 2}}
      
        onChangeText={(e) => set_member(e)}
        keyboardType="numeric"
         />
  </View>

  <View style={{flexDirection: 'row', width: '100%'}}>
  <TextInput label=" ماستر" mode='outlined' 
        outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
        style ={{flex: 2}}
        onChangeText={(e) => set_master(e)}
        keyboardType="numeric"
         />

<TextInput label=" ادمن" mode='outlined' 
        outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
        style ={{flex: 2}}
        onChangeText={(e) => set_admin(e)}
        keyboardType="numeric"
         />
  </View>



<TextInput label=" سوبر ادمن" mode='outlined' 
        outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
        onChangeText={(e) => set_s_admin(e)}
        keyboardType="numeric"
         />


     <View><Divider/></View>


     
      <Text style={{marginTop:  20,  textAlign: 'right' ,fontWeight: 'bold',}} variant="bodyMedium">  الرسائل الخاصة</Text>

     
      <View >
      <RadioButton.Group value={private_msg ||  room.private_msg}  >
      <RadioButton.Item position='leading'  label="الجميع " value="all" mode='android' color='#8CA8F5' uncheckedColor='#8CA8F5'
      labelStyle = {{fontSize: 14}} onPress={() => set_private_msg('all')}  />
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}}  label=" الاعضاء و المشرفين" value="masters & members" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_private_msg("masters & members")}/>
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}} label="المشرفين فقط " value="masters" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_private_msg("masters")}/> 
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}} label="لا احد " value="no one" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_private_msg("no one")}/>

    </RadioButton.Group>
      </View>

     <View><Divider/></View>


     <Text style={{marginTop:  20,  textAlign: 'right' ,fontWeight: 'bold'}} variant="bodyMedium">   من يستطيع بث الكاميرا</Text>

     <View >
      <RadioButton.Group value={camera ||  room.camera}  >
      <RadioButton.Item position='leading'  label="الجميع " value="all" mode='android' color='#8CA8F5' uncheckedColor='#8CA8F5'
      labelStyle = {{fontSize: 14}} onPress={() => set_camera('all')}  />
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}}  label=" الاعضاء و المشرفين" value="masters & members" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_camera("masters & members")}/>
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}} label="المشرفين فقط " value="masters" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_camera("masters")}/> 
      <RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}} label="لا احد " value="no one" mode='android'
       uncheckedColor='#8CA8F5' color='#8CA8F5' onPress={() => set_camera("no one")}/>

    </RadioButton.Group>
      </View>

<View><Divider/></View>

{/**
 * <Text style={{marginTop:  20,  textAlign: 'right' ,fontWeight: 'bold'}} variant="bodyMedium">   خيارات متقدمة   </Text>


<View >
<RadioButton.Group value={'first'}  >
<RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}} label=" مفتوح " value="first" mode='android' color='#8CA8F5'/>

<RadioButton.Item position='leading'  labelStyle = {{fontSize: 14}}  label=" الاعضاء و المشرفين" value="second" mode='android' uncheckedColor='#8CA8F5'/>
<RadioButton.Item position='leading'  label="بوابة الدخول " value="" mode='android' uncheckedColor='#8CA8F5' 
labelStyle = {{fontSize: 14}} />
</RadioButton.Group>
</View>
 */}



       </ScrollView>



{success ? 
    <View style ={{backgroundColor: '#F5FFEE', margin: 15, }}>
<Text 
style ={{textAlign: 'center', color: 'green', paddingVertical: 10, borderWidth: 1 ,
 borderColor: 'green', }}>
    {success}
 </Text>

</View> : ''}

       <Button mode='elevated'  onPress={onSave}
       labelStyle={{color: 'black'}}
         style ={{width: 170 , marginVertical: 10 , alignSelf: 'center' , 
                 backgroundColor: '#fbeb58' , shadowOpacity: 0}} >اضافة </Button>

        </View>
    )
}