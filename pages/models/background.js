import { View, Pressable, ImageBackground, Image, ScrollView, Animated, Easing } from "react-native";
import { Styles } from "../../styles/style";
import { FontAwesome } from '@expo/vector-icons';
import { Text } from "react-native-paper";
import pro from '../../assets/pro.png'
import crown from '../../assets/crown.png'
import { SafeAreaView } from "react-native";

import back1 from '../../assets/back1.jpg'
import back2 from '../../assets/back2.jpg'
import back3 from '../../assets/back3.jpg'
import back4 from '../../assets/back4.jpg'
import back5 from '../../assets/back5.jpg'
import back6 from '../../assets/back6.jpg'
import back7 from '../../assets/back7.jpg'
import back8 from '../../assets/back8.jpg'
import back9 from '../../assets/back9.jpg'
import back10 from '../../assets/back10.jpg'
import back11 from '../../assets/back11.jpg'
import back12 from '../../assets/back12.jpg'
import { Button } from "react-native-paper";



import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_name } from "../../reducers/user";

export default function Background (props){

  let dispatch = useDispatch()
    const [state, set_state] = useState(false)
    const [success , set_success] = useState(false)
        const translation = useRef(new Animated.Value(-200)).current;
    const roadAnimation = Animated.timing(translation, {
    toValue: 250,
    duration: 6000,
    useNativeDriver: true,
    easing: Easing.linear,
  });

  const startAnimation = () => {
      roadAnimation.start(() => {
        roadAnimation.reset();
        startAnimation();
      });
    };

    useEffect(() => {
      startAnimation();
    }, []);

    let me = useSelector(state => state.user.me)


    let pics = [{pic: back1 , name: 'back1'},
    {pic: back2 , name: 'back2'},
    {pic: back3 , name: 'back3'},
    {pic: back4 , name: 'back4'},
    {pic: back5 , name: 'back5'},
    {pic: back6 , name: 'back6'},
    {pic: back7 , name: 'back7'},
    {pic: back8 , name: 'back8'},
    {pic: back9 , name: 'back9'},
    {pic: back10 , name: 'back10'},
    {pic: back11 , name: 'back11'},
    {pic: back12 , name: 'back12'},]




    let colors = {
        member: 'rgb(201 17 201)',
        admin: 'blue', 
        super_admin: 'green',
        master_boy: 'red',
        master: 'red',
        master_girl: '#ff45ac',
        visitor: 'black',
        root: 'orange'
    }

    let pics2 = {
        'back1': back1,
        'back2': back2,
        'back3': back3,
        'back4': back4,
        'back5': back5,
        'back6': back6,
        'back7': back7,
        'back8': back8,
        'back9': back9,
        'back10': back10,
        'back11': back11,
        'back12': back12,

    }


    return(
        <View style ={Styles.home_view}>

            <SafeAreaView/>
         
         <View style ={{ marginTop: 30 , paddingHorizontal: 20, flexDirection: 'row', }}>
<Pressable  onPress={() => props.navigation.goBack()}>
    
<FontAwesome name="angle-double-left" size={24} color="black" />
</Pressable>
<Text variant="headlineSmall" style ={{flex: 2, textAlign: 'center'}}>تغيير خلفية الملف</Text>

</View>


<View style ={Styles.countries_card}>

<View>
  <ImageBackground 
   source={ pics2[state] || pics2[me.back]}>
   <View style ={{flexDirection: 'row', alignItems: 'center',  padding: 10, backgroundColor: '#FFFFFF7A'}}>



<View style ={{width: '90%' , overflow: 'hidden'}}>
<Text style ={{fontWeight: 'bold'}} >{me.name}</Text>


      <Text  variant="bodySmall" style ={{color: '#696767', fontWeight: 'bold'}}>
       {'-'}
       </Text>

  

</View>

{me.name_type === 'royal' ? 
<Image source={crown} style ={{position: 'absolute', right: 10, width: 30 , height: 40, top: 0}}/>
 : 
 me.name_type === 'protected' ? 
<Image source={pro} style ={{position: 'absolute', right: 10, width: 27 , height: 27, top: 10}}/>
 : ''}

</View>
   </ImageBackground>
</View>


<ScrollView  style={{ marginVertical: 25}}>

<View style ={{alignItems: 'center'}}>
{pics.map((p, key) => (
<Pressable key ={key} onPress={() => set_state(p.name)} style ={{height: 60 , width: '95%', maxWidth: 400, opacity: 0.5, borderWidth: 4 , borderColor: 'orange'}} >
<Image   source={p.pic} 
style ={{height: 60 , maxWidth: '100%', width: 400, }}/>
</Pressable>

))}

</View>
  
</ScrollView>

{success ? 
    <View style ={{backgroundColor: '#F5FFEE', marginBottom: 15, }}>
<Text 
style ={{textAlign: 'center', color: 'green', paddingVertical: 10, borderWidth: 1 ,
 borderColor: 'green', }}>
    {success}
 </Text>

</View> : ''}

<Button mode='elevated' onPress ={() => {
  set_success(false)
  dispatch(edit_name({id: me._id , body: {back: state} , set_error : () => {} , set_success: () => {}}))
  set_success('تم تعديل الخلفية بنجاح')
}}
        labelStyle={{color: 'black', }}
         style ={{ marginBottom: 20 , shadowOpacity: 0,
                 backgroundColor: '#fbeb58', width: 150 , alignSelf: 'center'}} >  حفظ</Button>

</View>


{/**backgrounds */}



        </View>
    )
}