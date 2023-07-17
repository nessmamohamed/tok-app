import * as React from 'react';
import { Modal, Portal,Button, DataTable,  } from 'react-native-paper';
import { View } from 'react-native';


export default function User_info (props) {

  let user_info = props.user_info



    return (
    <View style ={{justifyContent: 'center',  alignItems: 'center'}}>
        
        <Portal   >
          <Modal visible={props.user_info_modal} onDismiss={props.closeUserMenu} 
                 
 
          contentContainerStyle ={{backgroundColor: 'white',paddingVertical: 40 ,
           alignItems: 'center'}}>
         
         <DataTable style ={{ width: 300, borderWidth: 1 , borderColor: '#ddd'}}>

      

      <DataTable.Row>
      <DataTable.Cell >{user_info.name}</DataTable.Cell>

        <DataTable.Cell numeric> الاسم</DataTable.Cell>
      </DataTable.Row>

      
      <DataTable.Row>
      <DataTable.Cell > {user_info.ip}</DataTable.Cell>

        <DataTable.Cell numeric>الايبي</DataTable.Cell>
      </DataTable.Row>

      
      <DataTable.Row>
      <DataTable.Cell >{user_info.ip_country}</DataTable.Cell>

        <DataTable.Cell numeric >الدولة</DataTable.Cell>
      </DataTable.Row>

      
      <DataTable.Row>
      <DataTable.Cell >{'mobile'}</DataTable.Cell>

        <DataTable.Cell numeric>الجهاز</DataTable.Cell>
      </DataTable.Row>

         </DataTable>


         <Button onPress={props.closeUserMenu}
         mode="elevated" style={{marginTop: 25 , shadowOpacity: 0,
                 backgroundColor: '#fbeb58', width: 100 }}>موافق</Button>

        
          </Modal>
        </Portal>
   
    </View>
    )
}