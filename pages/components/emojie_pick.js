
import React from "react";
import { View } from "react-native"
import EmojiPicker from "rn-emoji-picker"
import {emojis} from "rn-emoji-picker/dist/data"


export default function Emojie_pick (props){

    const [recent, setRecent] = React.useState([]);


    return(
   <View>
    
         <View style ={{height: 300 , width: '100%', borderRadius: 15 , overflow: 'hidden',
        
    }}>
<EmojiPicker


emojis={emojis} // emojis data source see data/emojis
recent={recent} // store of recently used emojis
autoFocus={false} // autofocus search input
loading={false} // spinner for if your emoji data or recent store is async
darkMode={true} // to be or not to be, that is the question
perLine={10} // # of emoji's per line
onSelect={(e) =>  console.log(e)} // callback when user selects emoji - returns emoji obj
// callback to update recent storage - arr of emoji objs
backgroundColor={'aliceblue'} // optional custom bg color
enabledCategories={[ // optional list of enabled category keys
   'recent', 
   'emotion', 
   'emojis', 
   'activities', 
    'objects',
   'food', 
   'places', 
  'nature',
  'people'
 ]}

/>
</View>
   </View>
    )
}