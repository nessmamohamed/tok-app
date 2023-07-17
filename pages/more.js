
import {Button} from "react-native-paper";
import {  FontAwesome , Entypo, MaterialIcons} from '@expo/vector-icons';
import { SafeAreaView , Image} from "react-native";
import { View } from "react-native";
import { Styles } from "../styles/style";
import logo from '../assets/logo.png';
import { Text } from "react-native-paper";
import { ScrollView } from "react-native";


export default function More (props) {
    return(
        <SafeAreaView style ={Styles.home_view}>

<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
 marginHorizontal: 20, height: 50, marginTop: 10}}>


<View style = {{...Styles.logo_back, height: 60, width: 60 , }}>
<Image source= {logo} style ={{width: 60, height: 60 ,}}/>
</View>
<Text variant="titleLarge" style={{marginHorizontal: 10}} >TOK-CHAT</Text>


</View>

<ScrollView  style ={{...Styles.countries_card, paddingVertical: 30, 
}}>


    
<Button 
icon={() => <MaterialIcons name="settings" size={24} color='#57C7F3'  />}
 mode='outlined'
 onPress={() => props.navigation.navigate('settings')}
 labelStyle={{fontSize: 16, color: 'black'}}
  style ={{width: 250, alignSelf: 'center', borderColor: '#ddd', marginVertical: 15}} >
    الاعدادات
  </Button>



  <Button 
icon={() => <FontAwesome name="wechat" size={24} color='#57C7F3' />}  onPress={() => console.log('Pressed')}
 mode='outlined'
 
 labelStyle={{fontSize: 16, color: 'black'}}
  style ={{width: 250, alignSelf: 'center', borderColor: '#ddd', marginVertical: 15}} >
    غرفة المبيعات
  </Button>


  <Button 
icon={() => <Entypo name="shop" size={24} color='#57C7F3'  />}
 mode='outlined'
 
 labelStyle={{fontSize: 16, color: 'black'}}
  style ={{width: 250, alignSelf: 'center', borderColor: '#ddd', marginVertical: 15}} >
    شراء خدمة
  </Button>

  <Button 
icon={() => <Entypo name="menu" size={24} color='#57C7F3'  />}
 mode='outlined'
 
 labelStyle={{fontSize: 16, color: 'black'}}
  style ={{width: 250, alignSelf: 'center', borderColor: '#ddd', marginVertical: 15}} >
    حول
  </Button>


</ScrollView>

        </SafeAreaView>
    )
}