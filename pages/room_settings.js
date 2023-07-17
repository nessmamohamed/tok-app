import { View, SafeAreaView, Image } from "react-native";
import { Styles } from "../styles/style";
import { Text } from "react-native-paper";

import reports from '../assets/test.png'
import settings from '../assets/settings.png'
import info from '../assets/info.png'
import block from '../assets/forbidden.png'
import user from '../assets/user.png'
import sort from '../assets/sort.png'
import { Pressable } from "react-native";
import Master_reports from "./rooms_settings.js/reports";
import Log from "./rooms_settings.js/log";
import Blocked from "./rooms_settings.js/blocked";
import Settings from "./rooms_settings.js/settings";
import Accounts from "./rooms_settings.js/accounts";
import Room_Info from "./rooms_settings.js/room_info";
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from "react-redux";





export default function Room_Settings (props) {

  const [state, setstate] = useState('reports');
  let me = useSelector(state =>state.user.me)
  let permissions = me.permissions || {}

  console.log(permissions)
    return(
       <SafeAreaView style ={Styles.home_view}>
           
         <View style ={{flexDirection: 'row' , alignItems: 'center', marginTop: 30 , paddingHorizontal: 20}}>
<Pressable onPress={() => props.navigation.goBack()}>
<FontAwesome name="angle-double-left" size={24} color="black" />

</Pressable>
         <Text variant="titleLarge"  style ={{ textAlign: 'center', flex: 2}}> 
           {state === 'reports' ? 
             'تقارير المشرفين':
             state === 'logs' ? 
             'سجل الدخول':
             state === 'blocked' ? 
             'المحظورين':
             state === 'settings' ? 
             'اعدادات الغرفة':
             state === 'users' ? 
             'المستخدمين':
             state === 'info' ? 
             'معلومات الغرفة':
             'تقارير المشرفين'}
           </Text>

         </View>

           <View style={{...Styles.countries_card, padding: 30}}>

            <View style ={{flexDirection: 'row-reverse', justifyContent: 'space-around', 
                            }}>
              <Pressable onPress={ () => setstate('reports')} disabled ={permissions.masters_reports || me.program_owner ? false : true} >
                <Image source={reports} style ={{opacity: permissions.masters_reports || me.program_owner ?  1 : 0.5}} />
                </Pressable>
              <Pressable onPress={ () => setstate('logs')} disabled ={permissions.logout_history || permissions.block_device ? false : true}>
              <Image source={sort}  style ={{opacity: permissions.logout_history || permissions.block_device ?  1 : 0.5}}/>
              </Pressable>

               <Pressable onPress={ () => setstate('blocked')} disabled ={permissions.cancel_block  || me.program_owner ? false : true}>
              <Image source={block} style ={{opacity: permissions.cancel_block  || me.program_owner ?  1 : 0.5}}/>
               </Pressable>

               <Pressable onPress={ () => setstate('settings')} disabled ={permissions.room_settings || me.program_owner ? false : true}>
              <Image source={settings}  style ={{opacity: permissions.room_settings || me.program_owner?  1 : 0.5}}/>
               </Pressable>
                
                <Pressable onPress={ () => setstate('users')} disabled ={permissions.accounts_control || me.program_owner ? false : true}>
              <Image source={user}  style ={{opacity: permissions.accounts_control || me.program_owner ?  1 : 0.5}}/>
                </Pressable>

                <Pressable  onPress={ () => setstate('info')} disabled ={me.type !== 'member' && me.type !== 'visitor' || me.program_owner ? false : true}>
              <Image source={info} style ={{opacity: me.type !== 'member' && me.type !== 'visitor' || me.program_owner ?  1 : 0.5}}/>
                </Pressable>


            </View>


           <View style={{marginTop: 30}}> 
       
           {state === 'reports' ? 
             <Master_reports/>:
             state === 'logs' ? 
             <Log/>:
             state === 'blocked' ? 
             <Blocked/>:
             state === 'settings' ? 
             <Settings/>:
             state === 'users' ? 
             <Accounts navigation ={props.navigation}/>:
             state === 'info' ? 
             <Room_Info/>:
             <Master_reports/>}
           </View>
            
           </View>
        
       </SafeAreaView>
    )
}