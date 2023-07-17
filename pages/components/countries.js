import { Image, Pressable, ScrollView, View } from "react-native";
import star from '../../assets/star.png'
import star2 from '../../assets/star2.png'
import {  TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/EvilIcons";
import { Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSelector , useDispatch} from "react-redux";
import { getRoomsFetch,  } from "../../reducers/room";
import { useEffect, useState } from "react";


export default function Countries ( props) {

  let countries = useSelector(state => state.rooms.countries) || []
  let all_rooms = useSelector(state => state.rooms.allRooms)
  let countries_count = useSelector(state => state.rooms.countries_count)
  const [updated_countries , set_updated_countries] = useState([])

 

  useEffect(() => {

     let all_count =  countries.map(c => {
      return  {...c , visitors : countries_count[c.name]}
      })

     all_count.sort((c1, c2) => {
        return   c1.visitors < c2.visitors ? 1 : c1.visitors > c2.visitors ? -1 : 0
      })

      set_updated_countries(all_count)




  }, [countries_count]);


  let dispatch = useDispatch()

  const getRooms = (e ) => {
   dispatch(getRoomsFetch( {country: e ,navigation: props.navigation, }))
  }

  const get_rooms_count = (country ) => {
    let count = 0
    all_rooms.map(room => {
      if(room.country === country){
       return  count += 1
      }
     
    })
    return count
  }


  const get_package_rooms = (type ) => {
   let count = 0
   all_rooms.map(room => {
     if(room.package_name === type){
      return  count += 1
     }
    
   })
   return count
 }


 let my_rooms = useSelector(state => state.rooms.rooms_count)
 
 let special_rooms = all_rooms.filter(r => r.package_name === 'مميز')
 let gold_rooms = all_rooms.filter(r => r.package_name === 'ذهبي')

 let special_count = special_rooms.map((m) => my_rooms[m._id]) || []
 let s_count = special_count[0] ? special_count.reduce((a, b) => a+b) : 0

 
 let gold_count = gold_rooms.map((m) => my_rooms[m._id]) || []
 let g_count = gold_count[0] ? gold_count.reduce((a, b) => a+b) : 0

  
    return(
        <View style={{padding: 20, }}>

                   {/**search input */}
                   <TextInput
                   style={{marginBottom: 10 }}
     
       variant = 'standard'
       color="#26C5EC"
      leading={props => <Icon name="search" {...props} />
    }
    />

    {/**countries */}
<ScrollView   style ={{marginBottom: 80, }} showsVerticalScrollIndicator={false}>
    
<Pressable onPress = {() => getRooms('ذهبي')}
style={{flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 5 ,
 backgroundColor: '#fffbd1', padding: 10, borderRadius: 10,}}>

<Image source={star} style={{height: 55, width: 55}} />

<View style ={{marginHorizontal: 15, }}>
    <Text style ={{textAlign: 'right'}}> الغرف الذهبية</Text>

    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>

       <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
       <Entypo name="chat" size={15} color="#141212AE" />
       <Text style={{color: '#141212AE', marginHorizontal: 5}}>
         {get_package_rooms('ذهبي')} الغرف</Text>
       </View>

         <View style={{flexDirection: 'row-reverse', alignItems: 'center', marginHorizontal: 5}}>
       <FontAwesome5 name="users" size={15} color="#141212AE" />
       <Text style={{color: '#141212AE', marginHorizontal: 5}}>
           {g_count} المستخدمين</Text>
       </View>

    </View>
</View>


</Pressable >

<Pressable onPress = {() => getRooms('مميز')}>
<View style={{flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 5 , backgroundColor: '#D1FFFD', padding: 10, borderRadius: 10}}>

<Image source={star2} style={{height: 55, width: 55}} />

<View style ={{marginHorizontal: 15,}}>
<Text style ={{textAlign: 'right'}}> الغرف المميزة</Text>

<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>

<View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
<Entypo name="chat" size={15} color="#141212AE" />
<Text style={{color: '#141212AE', marginHorizontal: 5}}>
{get_package_rooms('مميز')} الغرف</Text>
</View>

 <View style={{flexDirection: 'row-reverse', alignItems: 'center', marginHorizontal: 5}}>
<FontAwesome5 name="users" size={15} color="#141212AE" />
<Text style={{color: '#141212AE', marginHorizontal: 5}}>
   {s_count} المستخدمين</Text>
</View>

</View>
</View>
</View>
</Pressable>


{updated_countries.map((country, key) => (
   <Pressable key ={key}  onPress={() => getRooms(country.name)}>

<View 
   style={{flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 5 , backgroundColor: '#F1F1F19D', padding: 10, borderRadius: 10, 
   }}>

   <Image src={country.url} style={{height: 55, width: 55}} />
   
   <View style ={{marginHorizontal: 15, }}>
   <Text style ={{textAlign: 'right'}} >  {country.name_ar}</Text>
   
   <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
   
   <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
   <Entypo name="chat" size={15} color="#141212AE" />
   <Text style={{color: '#141212AE', marginHorizontal: 5}}>
      {get_rooms_count(country.name)} الغرف</Text>
   </View>
   
    <View style={{flexDirection: 'row-reverse', alignItems: 'center', marginHorizontal: 5}}>
   <FontAwesome5 name="users" size={15} color="#141212AE" />
   <Text style={{color: '#141212AE', marginHorizontal: 5}}>
      {country.visitors} المستخدمين</Text>
   </View>
   
   </View>
   </View>
   </View>
   </Pressable>
       
))}



   
</ScrollView>


           
        </View>
    )
}