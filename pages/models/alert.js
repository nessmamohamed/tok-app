import * as React from 'react';
import { Modal, Portal,Button, Divider,   } from 'react-native-paper';
import { Text, View } from 'react-native';
import warning from '../../assets/warning.png'
import out from '../../assets/warning_red.png'
import close from '../../assets/close.png'
import success from '../../assets/success.png'
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/user';



export default function Alert (props) {


    let error = props.alert_type
    let stop_data = props.stop_data || {}
    
    let dispatch = useDispatch()

    let go_out =()=>{
        console.log('click')
     dispatch(logout())
     props.navigation.navigate('Main')
    }

    return (
    <View style ={{justifyContent: 'center',  alignItems: 'center'}}>
        
        <Portal   >
          <Modal visible={props.alert} 
          contentContainerStyle ={{backgroundColor: error === 'warning' ?  '#FFEBCD': (error === 'out' || error === 'stop' ) ? '#FFCDCD'  : 'white'
          ,paddingVertical: 40 ,
           alignItems: 'center',  }}>
         
          {error === 'warning' ? 
          <View>
              <View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text>لقد تم طردك من الغرفة</Text>
   
            <Image source = {warning} style ={{marginHorizontal: 5, width: 25 , height: 25}}/>
   

               </View>  

               
            <Divider style={{backgroundColor: 'white', marginTop: 20}}/>

<Button style ={{marginTop: 25 , width: 150}} mode='elevated' onPress ={go_out}>خروج</Button>
          </View> :
                error === 'out' ? 
                <View>
                     <View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                 <Text>لقد تم حظرك من الغرفة</Text>
        
                 <Image source = {out} style ={{marginHorizontal: 5, width: 25 , height: 25}}/>

              
        
                    
                    </View> 

                    <Divider style={{backgroundColor: 'white', marginTop: 20}}/>

<Button style ={{marginTop: 25 , width: 150}} mode='elevated' onPress ={() => go_out()}>خروج</Button>
                </View> : error === 'stop' ? 
                         <View>
                             <Text style ={{marginBottom: 15}}>لقد تم ايقافك من استخدام</Text>
                       
                           {stop_data.msgs ? 
                            <View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
                            <Text>الرسائل العامة</Text>
                           <Image source = {close} style ={{marginHorizontal: 10, width: 15 , height: 15}}/>
                  
                              
                              </View>: ''}

                        {stop_data.private_msgs ? 
                          <View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
                          <Text>الرسائل الخاصة</Text>
                         <Image source = {close} style ={{marginHorizontal: 10, width: 15 , height: 15}}/>
                
                            
                            </View>: ''}
{stop_data.mic ? 

<View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
<Text>المايك </Text>
<Image source = {close} style ={{marginHorizontal: 10, width: 15 , height: 15}}/>

  
  </View> :''}

                          <Divider style={{backgroundColor: 'white', marginTop: 10}}/>

                          <Button style ={{marginTop: 25 , width: 150}} mode='elevated' onPress ={() => props.closeAlert()}>موافق</Button>
                         </View>
                           : error === 'cancel' ? 
                               <View>
                                   <Text style ={{marginBottom: 15}}>لقد تم الغاء ايقافك من استخدام</Text>
                             
                                 {stop_data.msgs ? 
                                  <View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
                                  <Text>الرسائل العامة</Text>
                                 <Image source = {success} style ={{marginHorizontal: 10, width: 15 , height: 15}}/>
                        
                                    
                                    </View>: ''}
      
                              {stop_data.private_msgs ? 
                                <View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
                                <Text>الرسائل الخاصة</Text>
                               <Image source = {success} style ={{marginHorizontal: 10, width: 15 , height: 15}}/>
                      
                                  
                                  </View>: ''}
      {stop_data.mic ? 
      
      <View style ={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
      <Text>المايك </Text>
      <Image source = {success} style ={{marginHorizontal: 10, width: 15 , height: 15}}/>
      
        
        </View> :''}
      
                                <Divider style={{backgroundColor: 'white', marginTop: 10}}/>
      
                                <Button style ={{marginTop: 25 , width: 150}} mode='elevated' onPress ={() => props.closeAlert()}>موافق</Button>
                               </View>: ''  }      


        
          </Modal>
        </Portal>
   
    </View>
    )
}