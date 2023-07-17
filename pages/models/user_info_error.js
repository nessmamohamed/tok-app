import * as React from 'react';
import { Modal, Portal,Button,   } from 'react-native-paper';
import { Text, View } from 'react-native';


export default function User_info_error (props) {


  let error = props.error

    return (
    <View style ={{justifyContent: 'center',  alignItems: 'center'}}>
        
        <Portal   >
          <Modal visible={props.user_info_error} onDismiss={props.closeErrorMenu} 
                 
 
          contentContainerStyle ={{backgroundColor: 'white',paddingVertical: 40 ,
           alignItems: 'center'}}>
         
         <Text>{error}</Text>
        


         <Button onPress={props.closeErrorMenu}
         mode="elevated" style={{marginTop: 25 , shadowOpacity: 0,
                 backgroundColor: '#fbeb58', width: 100 }}>موافق</Button>

        
          </Modal>
        </Portal>
   
    </View>
    )
}