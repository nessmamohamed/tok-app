import { Image, SafeAreaView, ScrollView } from "react-native";
import { Text, View } from "react-native";
import logo from '../assets/logo.png'
import {Text as Text2  } from "react-native-paper";

import Slider from '@react-native-community/slider'
import { Card, Checkbox, Divider, Switch } from "react-native-paper";
import { useState } from "react";
import {  AntDesign} from '@expo/vector-icons';
import { Styles } from "../styles/style";

import NativeColorPicker from 'native-color-picker';

export default function Settings (props) {
    const [state, setstate] = useState('no one');
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [val, setval] = useState(15);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

    return(
        <SafeAreaView  >
           <View
            style={{flexDirection: 'row' , width: '100%',
             backgroundColor: '#fbeb58', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70,
             elevation: 10 }}>
 
    
<AntDesign name="doubleleft" size={22} color="black" onPress={ () => props.navigation.goBack()} />



<Text2 variant="titleLarge" >TOK-CHAT</Text2>
<View style = {{...Styles.logo_back, height: 60, width: 60 , }}>
<Image source= {logo} style ={{width: 60, height: 60 ,}}/>
</View>

</View>

 <ScrollView style ={{paddingBottom: 30 }}>
             
<View style={{flexDirection: 'row',  marginTop: 20 , justifyContent: 'space-around', alignItems: 'center'}}>
    <Text style={{fontSize: val}}> حجم الخط</Text>
<Slider
  style={{width: 200, height: 40 , }}
  minimumValue={13}
  maximumValue={25}
  value = {20}
  maximumTrackTintColor="lightgray"
  minimumTrackTintColor="#27C6EE"
  onValueChange={(v) => setval(v)}
/>
</View>

<View style ={{alignItems: 'flex-start', paddingHorizontal: 30 , marginTop: 10}}>
<Text></Text>

<Card style={{width: '100%', backgroundColor: 'white'}}>
    <Card.Title  title ='اعدادات خاصة '/>
    <Divider/>

    <Card.Content>
      <View>
        <Checkbox.Item label="رفض الرسائل الخاصة" status={state === 'no one' ? "checked" : 'unchecked'} mode = 'ios' labelStyle = {{fontSize: 14}} style ={{margin: -5}}
        onPress = {() => setstate('no one')} color ='#27C6EE'/>
        <Divider/>
    

        <Checkbox.Item label ="قبول جميع الرسائل" status = {state === "all" ? "checked" : 'unchecked'} mode = 'ios' labelStyle = {{fontSize: 14}}
        onPress = { () => setstate('all')} style ={{margin: -5}} color ='#27C6EE'/>

      </View>
    </Card.Content>

</Card>

<Card style={{width: '100%', backgroundColor: 'white' , marginTop: 10}}>
    <Card.Title  title ='اعدادات عامة '/>
    <Divider/>

    <Card.Content>
      <View style = {{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center' , marginTop: 15}}>
        <Text>اشعارات تسجيل الدخول و الخروج</Text>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch}  color = {'#26C5EC'}/>

      </View>

      <View style = {{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center' , marginTop: 15}}>
        <Text> اشعارات ذكر الاسم</Text>
      <Switch  color = {'#26C5EC'}/>

      </View>

      <View style = {{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center' , marginTop: 15}}>
        <Text> اشعارات الرسائل الخاصة </Text>
      <Switch  color = {'#26C5EC'}/>

      </View>

      <View style = {{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center' , marginTop: 15}}>
        <Text> الغاء صوت الاشعارات  </Text>
      <Switch  color = {'#26C5EC'}/>

      </View>

      <View style = {{flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center' , marginTop: 15}}>
        <Text> الغاء صوت الاشعارات اثناء التحدث  </Text>
      <Switch  color = {'#26C5EC'}/>

      </View>
    </Card.Content>

</Card>


</View>
 </ScrollView>
        </SafeAreaView>
    )
}