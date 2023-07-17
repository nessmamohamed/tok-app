import * as React from 'react';
import { View ,   } from 'react-native';
import { Button, Menu, Divider,  } from 'react-native-paper';




const User_menu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu 
        contentStyle={{backgroundColor: 'gray' , alignItems: 'flex-end'}}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu} labelStyle={{color: 'white'}}>الحالة</Button>}>

        <Menu.Item onPress={() => {}} title="متاح"  titleStyle={{color: 'white', textAlign: 'right',}} />
        <Divider style={{width: '90%', alignSelf: 'center'}} />

 



     
      </Menu>
    </View>
  );
};

export default User_menu;