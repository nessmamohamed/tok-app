import {View, Image, ScrollView} from 'react-native'
import { Button, Card, Divider, Text } from 'react-native-paper'

import info from '../../assets/info_.png'
import user from '../../assets/user_.png'
import clock from '../../assets/clock.png'
import { useDispatch, useSelector } from 'react-redux'
import { delete_reports } from '../../reducers/room'




export default function Master_reports () {

  let reports = useSelector(state => state.rooms.reports)
  let me = useSelector(state => state.user.me)
  let room = useSelector(state => state.rooms.room)
  let dispatch = useDispatch()

  const date = (date) => {
    let newDate = new Date(date)
      
    return newDate.getUTCMonth() + 1 + '/' + newDate.getDate()
}

const time = (date) => {
    let newDate = new Date(date)

    return newDate.toLocaleTimeString() 
}






    return(
       <View style ={{height: '100%'}}>
         <ScrollView style ={{flex : 2}}>
         

         {reports.map((r, key) => (
             <Card key ={key} style ={{backgroundColor: 'white', width: '95%', alignSelf : 'center' , marginVertical: 10}}>
             <Card.Content style={{alignItems: 'flex-end'}}>
      
         <Text >{r.masterName}</Text>
   
         <View style ={{flexDirection: 'row', marginTop: 10}}>
           <Text style={{marginHorizontal: 5}}>{r.action}  </Text>
           <Image source = {info} style={{width: 20, height: 20}}/>
   
         </View>
   
        <View style ={{width: '100%', marginVertical: 10}}>
         <Divider/>
        </View>
   
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', 
                     }}>
         
         <View style ={{flexDirection: 'row', }}>
           <Text variant='bodySmall' style={{marginHorizontal: 5}}> {date(r.date) } - { time(r.date) }</Text>
           <Image source = {clock} style={{width: 18, height: 18}}/>
   
         </View>
   
        <View style ={{flexDirection: 'row', }}>
           <Text variant='bodySmall' style={{marginHorizontal: 5}}> {r.userName} </Text>
           <Image source = {user} style={{width: 18, height: 18}}/>
   
         </View>
   
         
        </View>
         
       </Card.Content>
             </Card>
         ))}
          
        </ScrollView>


        {me.type === 'master' || me.type === 'program_owner' ? 
        
        <Button mode='elevated'  onPress={() => dispatch(delete_reports(room._id)) }
        labelStyle={{color: 'white'}}
         style ={{width: 170 , marginVertical: 10 , alignSelf: 'center' , 
                 backgroundColor: '#dc3545'}} >حذف التقارير</Button>
        :''}


       </View>
    )
}