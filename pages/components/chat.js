
import { KeyboardAvoidingView, Text, View,} from "react-native";

import {LinearGradient} from 'expo-linear-gradient'
import { Image } from "react-native";
import gold from '../../assets/gold.png'
import { ScrollView } from "react-native-gesture-handler";

import Chat_footer from './chat_footer'
import { useSelector } from "react-redux";

import crown from '../../assets/crown_text.png'
import pro from '../../assets/pro.png'

import out from '../../assets/logout.png'
import login from '../../assets/login.png'

import eye from '../../assets/eye.gif'
import report from '../../assets/report.png'
import chat from '../../assets/chat.gif'
import megaphone from '../../assets/megaphone.png'
import { useEffect, useRef } from "react";
import { Button } from "react-native-paper";

export default function Chat () {

let msgs = useSelector(state => state.rooms.msgs)
let room = useSelector(state => state.rooms.room) || {}
let me = useSelector(state => state.user.me) || {}

 const scroll_ref = useRef();

 useEffect(() => {

  scroll_to_bottom()

  setTimeout(() => {
    scroll_to_bottom()
  }, 250);

 }, [msgs]);



 const scroll_to_bottom =()=>{
  scroll_ref.current.scrollToEnd({animated: true})
 }

    return(
     <View style ={{height: '100%'}}>


<View style={{flex: 2}}>

  
<ScrollView style={{backgroundColor: 'white'}} ref = {scroll_ref
}>

     
<View style={{borderBottomWidth: 0.5 , borderBottomColor: '#C07FC9', alignItems: 'center', marginBottom: 15}}>
<Text style= {{textAlign: 'center', marginTop: 20, fontWeight: 'bold' , fontSize: 18}}>
     {room.welcome_messege}
     
 </Text>
 <Text style ={{marginBottom: 15}}>
 ** {me.name} **
 </Text>
</View>

{msgs.map((m, key) => (
  m.msg_type === 'text' ? 
  <View key = {key}>


{/**msgs */}

<View style ={{flexDirection: 'row', alignItems: 'center',  marginVertical: 5}}>
 <Image source={{uri: m.sender_icon}}
  style ={{width: 30 , height: 30, marginHorizontal: 5}}/>
<LinearGradient
// Background Linear Gradient
colors={ m.name_type === 'royal' || m.name_type === 'protected' ?['#8AE7EE', '#E4F7F8'] : ['#F0F0F0', '#F5F5F5']}
start = {{x: 1 , y: 0}}
style ={{ flex: 2 , minHeight: 75, borderBottomRightRadius: 50 , elevation: 5 , shadowColor: '#000000A9',
shadowOpacity: 0.5, padding: 10}}
>

<View style ={{flexDirection: 'row', alignItems: 'center'}}>
           <Text style ={{fontWeight: 'bold', fontSize: 15, marginRight: 5 }}>{m.sender_name}</Text>
                 <Image source={ m.name_type === 'royal'  ? crown : m.name_type === 'protected' ? pro :null} style={{marginBottom:2}}/>
           </View>

<View style={{borderBottomWidth: 1 , borderBottomColor: 'white', marginVertical: 5}}></View>

<Text>{m.msg}</Text>



</LinearGradient>
</View>
  </View>
  
  : m.msg_type === 'out' && m.sender_name !== me.name ? 
  
<View key ={key} style ={{width: '95%' , height: 40 , backgroundColor: '#f8d7da', flexDirection: 'row',
 alignItems: 'center', alignSelf: 'center' , marginVertical: 5, borderColor: '#f5c2c7', borderWidth: 0.3, borderRadius: 5,
 justifyContent: 'flex-end', paddingHorizontal: 10}}>

<Text style ={{fontWeight: 'bold', marginHorizontal: 5}}> غادر الغرفة</Text>
<Text style={{marginHorizontal: 5, color: 'brown', fontWeight: 'bold'}}>{m.sender_name}</Text>
<Image source={out}/>

</View>

:

 m.msg_type === 'join' && m.sender_name !== me.name ? 
  
<View key = {key} style ={{width: '95%' , height: 40 , backgroundColor: '#fff3cd', flexDirection: 'row',
 alignItems: 'center', alignSelf: 'center' , marginVertical: 5, borderColor: '#ffecb5', borderWidth: 0.3, borderRadius: 5,
 justifyContent: 'flex-end', paddingHorizontal: 10}}>

<Text style ={{fontWeight: 'bold', marginHorizontal: 5}}> انضم الى الغرفة</Text>
<Text style={{marginHorizontal: 5, color: 'brown', fontWeight: 'bold'}}>{m.sender_name}</Text>
<Image source={login}/>

</View>:
 m.msg_type === 'profile_viewer'  ? 
  
 <View key = {key} style ={{width: '95%' , height: 40 , backgroundColor: '#CDF9FF', flexDirection: 'row',
 alignItems: 'center', alignSelf: 'center' , marginVertical: 5, borderColor: 'aqua', borderWidth: 0.3, borderRadius: 5,
  justifyContent: 'flex-end', paddingHorizontal: 10}}>
 
 <Text style ={{fontWeight: 'bold', marginHorizontal: 5}}> شاهد الملف الخاص بك  </Text>
 <Text style={{marginHorizontal: 5, color: 'brown', fontWeight: 'bold'}}>{m.viewer}</Text>
 <Image source={eye} style ={{width: 22 , height: 22}}/>
 
 </View>:

m.msg_type === 'request'  ? 
  

<View key = {key} style ={{width: '95%' , height: 40 , backgroundColor: '#E7FCDD', flexDirection: 'row',
 alignItems: 'center', alignSelf: 'center' , marginVertical: 5, borderColor: 'green', borderWidth: 0.3, borderRadius: 5,
  justifyContent: 'flex-end', paddingHorizontal: 10}}>
 
 <Text style ={{fontWeight: 'bold', marginHorizontal: 5}}>حاول ارسال رسالة خاصة لك </Text>
 <Text style={{marginHorizontal: 5, color: 'brown', fontWeight: 'bold'}}>{m.name}</Text>
 <Image source={chat} style ={{width: 28 , height: 25}}/>
 
 </View>:
m.msg_type === 'report'  ? 


<View key = {key} style ={{width: '95%' , height: 40 , backgroundColor: '#F2E8F8', flexDirection: 'row',
 alignItems: 'center', alignSelf: 'center' , marginVertical: 5, borderColor: 'purple', borderWidth: 0.3, borderRadius: 5,
 justifyContent: 'flex-end', paddingHorizontal: 10, }}>

<Text style ={{fontWeight: 'bold', marginHorizontal: 5, }}>
  <Text style ={{opacity: 0}}>T</Text>
  {m.msg} </Text>
<Image source={report} style ={{width: 25 , height: 25}}/>

</View>:

m.type === 'public'  ? 




<View key = {key} style ={{width: '95%' , backgroundColor: '#DDF2FC', 
 alignItems: 'center', alignSelf: 'center' , marginVertical: 5, borderColor: 'aqua', borderWidth: 0.3, borderRadius: 5, padding: 10}}>
 
<View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 15, alignItems: 'center' , width: '100%'}}>
  <Text>الدعم الفني</Text>
  <Image source={megaphone} style={{marginHorizontal: 5}}/>
</View>

<Text style ={{color: 'gray'}}>{m.text}</Text>
 
 </View>
:
m.msg_type === 'file' ? 

<View key = {key}>

<View style ={{flexDirection: 'row', alignItems: 'center',  marginVertical: 5}}>
 <Image source={{uri: m.sender_icon}}
  style ={{width: 30 , height: 30, marginHorizontal: 5}}/>
<LinearGradient
// Background Linear Gradient
colors={ m.name_type === 'royal' || m.name_type === 'protected' ?['#8AE7EE', '#E4F7F8'] : ['#F0F0F0', '#F5F5F5']}
start = {{x: 1 , y: 0}}
style ={{ flex: 2 , minHeight: 75, borderBottomRightRadius: 50 , elevation: 5 , shadowColor: '#000000A9',
shadowOpacity: 0.5, padding: 10}}
>

<View style ={{flexDirection: 'row', alignItems: 'center'}}>
           <Text style ={{fontWeight: 'bold', fontSize: 15, marginRight: 5 }}>{m.sender_name}</Text>
                 <Image source={ m.name_type === 'royal'  ? crown : m.name_type === 'protected' ? pro :null} style={{marginBottom:2}}/>
           </View>
           <View style={{borderBottomWidth: 1 , borderBottomColor: 'white', marginVertical: 5}}></View>


<Image source={{uri : m.filePath}} style ={{width: '80%', height: 250, borderRadius: 10}}/>



</LinearGradient>
</View>
  </View>
  :
''
))}








</ScrollView>
</View>


{/**footer ---------------------------- */}

<Chat_footer />

     </View>
    )
}