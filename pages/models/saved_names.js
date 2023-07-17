import * as React from 'react';
import { Modal, Portal, RadioButton } from 'react-native-paper';
import { ScrollView, View } from 'react-native';


const Saved_names = (props) => {

    const [name , set_name] = React.useState('')
  
    let users_saved = props.users_saved || []

  return (
    
      <Portal>
        <Modal  visible={props.saved_modal} onDismiss={props.handle_saved_modal} 
        contentContainerStyle ={{backgroundColor: 'white',paddingVertical: 40 ,
         alignItems: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25, maxHeight: 400}} 
         style={{flex: 1 , justifyContent: 'flex-end'}}>
      
      <ScrollView style ={{width: '100%'}}>
     
     <View>
     <RadioButton.Group style={{flex: 2}} value={name} >
      {users_saved.map((n, key) => (
         
                 
      <RadioButton.Item key ={ key } style ={{backgroundColor: '#FDFFEC' , flex: 2, borderColor: 'gray' , borderWidth: 0.5, marginBottom: 2}}
       label={n.name} value={n.name} mode='android'  color='#8CA8F5' uncheckedColor='#8CA8F5' 
       onPress={() =>{
        set_name(n.name)

        props.handle_saved_modal()
        props.set_user({name: n.name , room_password: n.room_password , name_password: n.name_password})
       }
      }
      />
  
         
        ))}
      </RadioButton.Group>
     </View>

     
      </ScrollView>
        </Modal>
      </Portal>
 
  );
};

export default Saved_names;