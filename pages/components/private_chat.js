import { Image, View, Text, ScrollView } from "react-native";
import * as React from 'react';
import { LinearGradient } from "expo-linear-gradient";

import Chat_footer from './chat_footer'
import { useSelector } from "react-redux";
import crown from '../../assets/crown_text.png'
import pro from '../../assets/pro.png'
import { useState } from "react";
import { useRef } from "react";
export default function Private_Chat (props){


  let private_scroll = useRef()

  const [msgs, setMsgs] = useState(false)
  let current_conversation = useSelector(state => state.rooms.current_conversation)
   
  let conversation = msgs || current_conversation.msgs || []

 
  React.useEffect(() => {

    setMsgs(current_conversation.msgs)

    scroll_to_bottom()
    setTimeout(() => {
      scroll_to_bottom()
    }, 250);

   }, [current_conversation])

   const scroll_to_bottom =()=>{
    private_scroll.current.scrollToEnd({animated: true})
   }
  
    
    let user = props.route.params.user || {}
    let me = useSelector(state => state.user.me)


    return(
        <View style ={{backgroundColor: '#91d9e8'}} >
       
        <View  
      
        style={{ height: '100%',
         borderTopLeftRadius: 50, borderTopRightRadius: 50 , backgroundColor: 'white',
         justifyContent: 'flex-start', alignItems: 'flex-end',  }}

    
   
         
         >



<View style = {{width: '100%' , height: 40 , backgroundColor: '#FBFFC2', alignItems: 'center',
                            borderTopLeftRadius: 50, borderTopRightRadius: 50 , 
                            flexDirection: 'row', paddingHorizontal: 20}}>
                  
              <Text style={{flex: 2, textAlign: 'center'}}> {user.name}</Text>
            </View>
                

                {/**chat --------------------------------------------------------------- */}
          

            <ScrollView style ={{width: '100%' , paddingRight: 10, marginVertical: 20,  flex: 2}} ref ={private_scroll}>

              {/**msgs/---------------------------------------------------- */}
              {conversation.map((msg , key) => (  
                msg.type !== 'file' ? 
                <View key ={key} style ={{flexDirection: 'row', alignItems: 'center',  marginVertical: 5,}}>
                <Image source={{uri: msg.sender_id === current_conversation.friend_id ? current_conversation.friend_icon : me.icon}}
                 style ={{width: 30 , height: 30, marginHorizontal: 5}}/>
             <LinearGradient
            // Background Linear Gradient
            colors={msg.name_type === 'royal' || msg.name_type === 'protected' ? ['#0dcaf06b', '#CEECF16B']: ['#F0F0F0', '#F8F4F4']}
            start = {{x: 1 , y: 0}}
            style ={{ flex: 2 , minHeight: 75, borderTopRightRadius: msg.name_type === 'royal' || msg.name_type === 'protected' ? 30 :10, padding: 10,
                borderRadius:10}}
          >
      
           <View style ={{flexDirection: 'row', alignItems: 'center'}}>
           <Text style ={{fontWeight: 'bold', fontSize: 15, marginRight: 5 }}>{msg.sender_id === me._id ? me.name : current_conversation.friend_name}</Text>
                 <Image source={ msg.name_type === 'royal'  ? crown : msg.name_type === 'protected' ? pro :null} style={{marginBottom:2}}/>
           </View>
            <View style={{borderBottomWidth: 1 , borderBottomColor: 'white', marginVertical: 5}}></View>
      
            <Text style ={{color: msg.color}}>{msg.text}</Text>
      
      
          </LinearGradient>
             </View> : 
             <View key ={key} style ={{flexDirection: 'row', alignItems: 'center',  marginVertical: 5,}}>
             <Image source={{uri: msg.sender_id === current_conversation.friend_id ? current_conversation.friend_icon : me.icon}}
              style ={{width: 30 , height: 30, marginHorizontal: 5}}/>
          <LinearGradient
         // Background Linear Gradient
         colors={msg.name_type === 'royal' || msg.name_type === 'protected' ? ['#0dcaf06b', '#CEECF16B']: ['#F0F0F0', '#F8F4F4']}
         start = {{x: 1 , y: 0}}
         style ={{ flex: 2 , minHeight: 75, borderTopRightRadius: msg.name_type === 'royal' || msg.name_type === 'protected' ? 30 :10, padding: 10,
             borderRadius:10}}
       >
   
        <View style ={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style ={{fontWeight: 'bold', fontSize: 15, marginRight: 5 }}>{msg.sender_id === me._id ? me.name : current_conversation.friend_name}</Text>
              <Image source={ msg.name_type === 'royal'  ? crown : msg.name_type === 'protected' ? pro :null} style={{marginBottom:2}}/>
        </View>
         <View style={{borderBottomWidth: 1 , borderBottomColor: 'white', marginVertical: 5}}></View>
          
         <Image source={{uri : msg.filePath}} style ={{width: '80%', height: 250, borderRadius: 10}}/>

   
   
       </LinearGradient>
          </View>
           ))}
           </ScrollView>


{/**footer ------------ */}

<View style ={{width: '100%'}}>
<Chat_footer page = 'private' friend = {user} msgs ={msgs}/>
</View>


      

        </View>

        </View>
    )
}