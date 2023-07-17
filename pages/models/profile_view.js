import * as React from 'react';
import { Modal, Portal, Text, Card } from 'react-native-paper';
import { ImageBackground, View } from 'react-native';

import { Entypo , MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';


const Profile_view = (props) => {


  const containerStyle =
   {backgroundColor: 'white',width: 350  , alignSelf: 'center', height: 500, borderRadius: 25,
  };

  let user_info = props.user_info
  let picture = user_info.picture ||{}
  let cover = user_info.cover ||{}


  const date = (date) => {
    let newDate = new Date(date)
      
    return newDate.toLocaleDateString()
}

  return (
    <View>
      <Portal>
        <Modal visible={props.visible} onDismiss={props.closeProfile} contentContainerStyle={containerStyle}>
         {/**photo */}

<ScrollView style ={{ width: 350,   borderRadius: 25}} >
<ImageBackground source = {{uri: cover.filePath}}
style ={{height: 180 , width: '100%' ,  backgroundColor: '#B3B0B0', alignItems: 'center'}}>

<Image source={{uri: picture.filePath}}
    style ={{height: 100 , width: 100 , borderRadius: 50, 
    position: 'absolute', bottom: -40, zIndex: 2 ,}}/>

  


   
  </ImageBackground>

{/**counts */}



  <View style ={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 50, width: 350}}>


  <View 
    style ={{backgroundColor: '#E881EC50', borderColor: '#E881EC', borderWidth: 1,
     height: 70, width: 70, borderRadius: 15, justifyContent: 'center'}}>
   <View style ={{ alignItems: 'center'}}>
   <Text style={{textAlign: 'center', marginBottom: 5}}>{user_info.visitors}</Text>
   <Text style={{textAlign: 'center', marginBottom: 5}}>الزوار</Text>

   </View>
  
     
    </View>

  <View>


    
    <View 
    style ={{backgroundColor: '#95E98444', borderColor: '#95E984', borderWidth: 1,
     height: 70, width: 70, borderRadius: 15, justifyContent: 'center'}}>
   <View style ={{ alignItems: 'center'}}>
   <Text style={{textAlign: 'center', marginBottom: 5}}>{user_info.online_percent}</Text>
   <Text style={{textAlign: 'center', marginBottom: 5}}>التواجد</Text>

   </View>
  
     
    </View>

    </View>

  <View>
    <View 
    style ={{backgroundColor: '#838AE634', borderColor: '#8389E6', borderWidth: 1,
     height: 70, width: 70, borderRadius: 15, justifyContent: 'center'}}>
   <View style ={{ alignItems: 'center'}}>
   <Text style={{textAlign: 'center', marginBottom: 5}}>{user_info.talking_time}</Text>
   <Text style={{textAlign: 'center', marginBottom: 5}}>التحدث</Text>

   </View>
  
     
    </View>

    </View>


<View>
    <View 
    style ={{backgroundColor: '#EC87803B', borderColor: '#EC8780FB', borderWidth: 1,
     height: 70, width: 70, borderRadius: 15, justifyContent: 'center'}}>
   <View style ={{ alignItems: 'center'}}>
   <Text style={{textAlign: 'center', marginBottom: 5}}>{user_info.ban}</Text>
   <Text style={{textAlign: 'center', marginBottom: 5}}>حظر</Text>

   </View>
  
     
    </View>

    </View>


  
</View>


{/**info */}

<Card style={{marginVertical: 30, marginHorizontal: 20, backgroundColor: 'aliceblue'}} contentStyle={{paddingHorizontal: 30}}>
  <Card.Content>



    <View style={{flexDirection: 'row' , justifyContent: 'space-around'}}>

    <View style={{flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
    <Text style={{marginHorizontal: 10}}>{user_info.love}</Text>

    <Entypo name="heart" size={20} color="black" />
      
    </View>
       
    <View style={{flexDirection: 'row', flex: 3, justifyContent: 'flex-end' }}>
    <Text style={{marginHorizontal: 10}}>{user_info.work}</Text>

    <MaterialIcons name="work" size={20} color="black" />
      
    </View>

  

    </View>


    <View style={{flexDirection: 'row' , justifyContent: 'space-around' , marginTop: 15}}>

<View style={{flexDirection: 'row' , flex: 2, justifyContent: 'flex-end'}}>
<Text style={{marginHorizontal: 10}}>{user_info.country}</Text>

<Entypo name="flag" size={20} color="black" />
  
</View>
   
<View style={{flexDirection: 'row', flex: 3, justifyContent: 'flex-end' }}>
<Text style={{marginHorizontal: 10}}>{user_info.city}</Text>

<MaterialIcons name="home" size={20} color="black" />
  
</View>



</View>


<View style={{flexDirection: 'row' , justifyContent: 'space-around' , marginTop: 15}}>

<View style={{flexDirection: 'row' , flex: 2, justifyContent: 'flex-end'}}>
<Text style={{marginHorizontal: 10}}>{user_info.sex}</Text>

<Entypo name="man" size={20} color="black" />
  
</View>
   
<View style={{flexDirection: 'row', flex: 3, justifyContent: 'flex-end' }}>
<Text style={{marginHorizontal: 10}}>{ user_info.birthday ? date(user_info.birthday) : ''}</Text>

<MaterialIcons name="cake" size={20} color="black" />
  
</View>



</View>

  </Card.Content>
</Card>

</ScrollView>
        </Modal>
      </Portal>

    </View>
  );
};

export default Profile_view;