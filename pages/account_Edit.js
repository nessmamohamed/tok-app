import { View , SafeAreaView, Pressable, ScrollView, Image} from "react-native";
import { Styles } from "../styles/style";
import { FontAwesome } from '@expo/vector-icons';
import { Button, Card, Checkbox, Divider, Text, TextInput , } from "react-native-paper";
import { Entypo } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from "react";


import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";

import {REACT_APP_URL} from '@env'
import { edit_name } from "../reducers/user";
import axios from "axios";

export default function Account_Edit (props){

    const [selectedDate, setSelectedDate] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [photo, set_photo ] = useState(false)
    const [cover , set_cover] = useState(false)


    const [success , set_success] = useState(false)
    const [err , set_error] = useState(false)
    const [loading , set_loading] = useState(false)


    const [formData1 , set_data] = useState({})
    const [formData2 , set_data2 ] = useState({})
    const [about, set_about ] = useState(false)
    const [sex, set_sex ] = useState('male')
    const [statue, set_statue] = useState(false)
    const [love, set_love] = useState(false)
    const [work, set_work ] = useState(false)
    const [city, set_city] = useState(false)
    const [country, set_country] = useState(false)
    const [birthday, set_birthday ] = useState(false)
    const [room_password, set_room_password] = useState(false)
    const [name_password, set_name_password] = useState(false)
    const [old_name_password, set_old_name_pass ] = useState(false)
    const [old_room_password, set_old_room_pass ] = useState(false)
    const [code , set_code] = useState(false)
    
    let dispatch = useDispatch()


    let me = useSelector(state =>  state.user.me )

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setSelectedDate(date);
      hideDatePicker();
    };


    const handleChoosePhoto = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 1],
        quality: 1,
        
      });
  
      
      if (!result.canceled) {
  
        set_photo(result.assets[0].uri)

        const formData_photo = new FormData();
    
        let localUri = result.assets[0].uri ;
        let filename = localUri.split('/').pop()     
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
    
        formData_photo.append('file', { uri: localUri, name: filename, type });
    
        set_data(formData_photo)
  
      }
     };


     const handleChooseCover = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 1],
        quality: 1,
        
      });
  
      
      if (!result.canceled) {
  
        set_cover(result.assets[0].uri)

        
        const formData_cover = new FormData();
    
        let localUri = result.assets[0].uri ;
        let filename = localUri.split('/').pop()     
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
    
        formData_cover.append('file', { uri: localUri, name: filename, type });
    
        set_data2(formData_cover)

  
      }
     };


     onUpdate = () => {

        set_error(false)
        set_success(false)
        set_loading(true)

        if(me.name_type === 'royal' || me.name_type === 'protected'){
  
          let photo_path = {}
          
          axios.post(`${REACT_APP_URL}/upload`, formData1, 
              { headers: {
                'Content-Type': 'multipart/form-data'
              }}).then(res => {
                const  {filePath, fileName} = res.data

                  photo_path = {fileName, filePath}
                
  
                axios.post(`${REACT_APP_URL}/upload`, formData2, 
              { headers: {
                'Content-Type': 'multipart/form-data'
              }}).then(res => {
                const  {filePath, fileName} = res.data
                
  
      
                   let body = {about , birthday, city, country,  statue, sex , work ,picture: photo_path, cover: {filePath, fileName}, love}
                  
      
                      let id = me.name_id || me._id
      
                       
                    dispatch(edit_name({id, body, set_error , set_success}))
                      
                  if(name_password, old_name_password){
                      let body = {name: me.name, name_password, old_name_password, code}
                    axios.post(`${REACT_APP_URL}/name_password`, body)
                    .catch(err => set_error('كلمة مرور الاسم  او الكود خطأ'))}

              })})
        }

                  if(room_password, old_room_password){
                      let body = {room_password, old_room_password}

                    axios.put(`${process.env.REACT_APP_URL}/user/${user._id}`, body)
                    .catch(err => set_error( 'كلمة مرور الغرفة خاطئة'))
                  }
   

      
  }
   
 

  let picture = me.picture || {}
  let my_cover = me.cover || {}
    return(
        <SafeAreaView style ={Styles.home_view}>

<DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      
        <View style ={{ marginTop: 30 , paddingHorizontal: 20}}>
<Pressable onPress={() => props.navigation.goBack()}>
    
<FontAwesome name="angle-double-left" size={24} color="black" />

</Pressable>

</View>

<View style ={{...Styles.countries_card, alignItems: 'center', overflow: 'hidden'}}>


    {/**photo */}

  <Image source={{uri : cover || my_cover.filePath }} style ={{height: 180 , width: '100%' ,  backgroundColor: '#B3B0B0', alignItems: 'center'}}>
</Image>
<Pressable onPress={() => handleChooseCover()} style={{alignSelf: 'right'}}>
<Entypo name="camera" size={30} color="#706D6D" />

</Pressable>

<View style ={{flexDirection: 'row'}}>
<Image source={{uri: photo  || picture.filePath}} style ={{width: 100 , height: 100, borderRadius: 50, borderColor: 'white' , borderWidth: 3
, marginTop: -50}}  ></Image>

<Pressable onPress={() => handleChoosePhoto()}>
<Entypo name="camera" size={30} color="#706D6D" />

</Pressable>
</View>

<ScrollView style={{width: '100%', flex: 2, marginVertical : 45}}>
    
  {/**forms */}

<View style ={{width: '100%', paddingHorizontal: 20}}>
  <TextInput label ='عني' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" onChangeText={e => set_about(e)} />
  <TextInput label ='الحالة' mode = 'outlined' multiline outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" onChangeText={e => set_statue(e)} />
  <TextInput label ='الجنسية' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" onChangeText={e => set_country(e)}/>
  <TextInput label ='مقيم في' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1"  onChangeText={e => set_city(e)}/>
  <TextInput label ='العمل' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1"  onChangeText={e => set_work(e)}/>
  <TextInput label ='الحالة العاطفية' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" onChangeText={e => set_love(e)} />

{/**date */}
 <Pressable onPress = {showDatePicker}>
    <View  pointerEvents="none">
    <TextInput label =' تاريخ الميلاد' mode = 'outlined' outlineColor="#0B9DF1" 
  activeOutlineColor="#0B9DF1"
  right={<TextInput.Icon icon = {() =><FontAwesome name="calendar" size={24} color="#9C9C9C" />}/>}
  onChangeText={e => set_birthday(e)}
   />
    </View>
 </Pressable>


    <Divider style ={{marginVertical: 15, width: '100%', color: 'gray', height: 1}}/>

  <View style ={{flexDirection: 'row', justifyContent: 'space-around'}}>

  <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', }}label="انثى" status={sex === 'male' ? "unchecked" : 'checked'} 
  onPress={() => set_sex('female')}
  color='#557EF0'
   uncheckedColor='#557EF0' />

        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', }}  label="ذكر" status={sex === 'female' ? "unchecked" : 'checked'}
          color='#557EF0' uncheckedColor='#557EF0'
  onPress={ () =>set_sex('male')}
  />
        </View>

    <Divider style ={{marginVertical: 15, width: '100%', color: 'gray', height: 1}}/>

{/**name password */}

<Text variant="bodyMedium" style ={{fontWeight: 'bold', textAlign: 'center'}}>تعديل كلمة مرور الاسم </Text>

<TextInput label =' كود الاسم' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" onChangeText={e => set_code(e)} />

<TextInput label =' كلمة مرور الاسم الحالية' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1"  onChangeText={e => set_name_password(e)}/>

<TextInput label =' كلمة مرور الاسم السابقة' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" onChangeText={e => set_old_name_pass(e)} />


{/**room password */}

<Text variant="bodyMedium" style ={{fontWeight: 'bold', textAlign: 'center', marginTop: 15}}>تعديل كلمة مرور الغرفة </Text>


<TextInput label =' كلمة مرور الغرفة الحالية' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1"  onChangeText={e => set_room_password(e)}/>

<TextInput label =' كلمة مرور الغرفة السابقة' mode = 'outlined' outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" onChangeText={e => set_old_room_pass(e)}/>


</View>
</ScrollView>


{err ? 
    <View style ={{backgroundColor: '#FFEEEE', }}>
<Text 
style ={{textAlign: 'center', color: 'brown', paddingVertical: 10, borderWidth: 1 ,
 borderColor: 'brown', }}>
    {err.msg || err}
 </Text>

</View> : success ? 
    <View style ={{backgroundColor: '#F5FFEE', marginBottom: 15, }}>
<Text 
style ={{textAlign: 'center', color: 'green', paddingVertical: 10, borderWidth: 1 ,
 borderColor: 'green', }}>
    {success}
 </Text>

</View> : ''}



<Button mode='elevated' 
        labelStyle={{color: 'black', }}
         style ={{ marginBottom: 20 , shadowOpacity: 0,
                 backgroundColor: '#fbeb58'}} 
                 onPress = { () => onUpdate()}> تعديل الملف</Button>
</View>
</SafeAreaView>
    )
}