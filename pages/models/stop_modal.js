import * as React from 'react';
import { Modal, Portal,  Button, Checkbox, Divider,  } from 'react-native-paper';
import { View } from 'react-native';
import { useState } from 'react';

const Stop_modal = (props) => {
 
 const [msgs , set_msgs] = useState(true)
 const [private_msgs , set_private_msgs] = useState(true)
 const [mic , set_mic] = useState(true)



  
  return (
    
      <Portal>
        <Modal visible={props.stop_modal} onDismiss={props.close_stop} 
        contentContainerStyle ={{backgroundColor: 'white',paddingVertical: 40 ,
         alignItems: 'center' , alignItems: 'center'}}>

<Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
        onPress={() => set_private_msgs(!private_msgs)}
           label="حظر رسائل خاصة" status={private_msgs ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'/>

<Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
        onPress={() => set_msgs(!msgs)}
           label="حظر رسائل " status={msgs ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'/>

<Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
        onPress={() => set_mic(!mic)}
           label="حظر مايك" status={mic ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'/>

           <Divider style ={{width: '80%' , backgroundColor: 'gray', marginVertical: 15}}/>

          <View style ={{flexDirection: 'row' , }}>

            <Button mode='elevated' onPress = {() => props.accept_stop({msgs , private_msgs, mic})}
            labelStyle={{color: 'white'}}
             style ={{backgroundColor: '#dc3545', marginVertical: 20}}
             >ايقاف</Button>

            <Button  mode='contained' onPress = {props.close_stop}
            style ={{backgroundColor: '#ddd', marginVertical: 20 , marginHorizontal: 10}}>الغاء</Button>

          </View>
        </Modal>
      </Portal>
 
  );
};

export default Stop_modal;