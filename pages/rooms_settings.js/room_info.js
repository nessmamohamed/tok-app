import { View } from "react-native";
import { Badge, Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";

export default function Room_Info (){

    let room = useSelector(state => state.rooms.room)
    let account_limit = room.account_limit || {}
    const date = (date) => {
        let newDate = new Date(date)
          
        return newDate.toLocaleDateString()
    }
    
    return(
        <View>

<Card style ={{backgroundColor: 'white', width: '95%', alignSelf : 'center' , marginVertical: 10}}>
<Card.Content style={{alignItems: 'flex-end'}}>
<View style ={{flexDirection: 'row'}}>

<Text style={{fontWeight: 'bold'}}>{room.name} </Text>
<Text> :</Text>

    <Text>اسم الغرفة  </Text>

</View>

<View style ={{flexDirection: 'row', marginTop: 10}}>

<Text style={{fontWeight: 'bold'}}> {room.owner} </Text>
<Text> :</Text>

    <Text>اسم المالك  </Text>

</View>

<View style ={{flexDirection: 'row', marginTop: 10}}>

<Text style={{fontWeight: 'bold'}}> {room.email}</Text>
<Text> :</Text>

    <Text> البريد  </Text>

</View>

<View style ={{flexDirection: 'row', marginTop: 10}}>

<Text style={{fontWeight: 'bold'}}> {room.capacity}</Text>
<Text> :</Text>

    <Text> سعة الغرفة  </Text>

</View>

<View style ={{flexDirection: 'row', marginTop: 10}}>

<Text style={{fontWeight: 'bold'}}> 50 </Text>
<Text> :</Text>

    <Text> المتصلين </Text>

</View>


<View style ={{flexDirection: 'row', marginTop: 10}}>

<Text style={{fontWeight: 'bold'}}> {room.number} </Text>
<Text> :</Text>

    <Text> رقم الغرفة </Text>

</View>



<View style ={{flexDirection: 'row', marginTop: 10}}>

<Text style={{fontWeight: 'bold'}}>{date(room.start_date)}</Text>
<Text> :</Text>

    <Text> تاريخ البداية  </Text>

</View>

<View style ={{flexDirection: 'row', marginTop: 10}}>

<Text style={{fontWeight: 'bold'}}> {date(room.end_date)} </Text>
<Text> :</Text>

    <Text> تاريخ النهاية  </Text>

</View>


</Card.Content>
            </Card>

<Text style ={{marginTop: 20 , fontWeight: 'bold', textAlign: 'center'}} variant="bodyLarge">حد الحسابات</Text>


<View style ={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>


<View>
        <Text style={{textAlign: 'center', marginBottom: 5}}>ماستر</Text>
    <Badge size= {45} style ={{backgroundColor: '#EC8880'}}>{account_limit.master}</Badge>

    </View>
    
<View>
        <Text style={{textAlign: 'center', marginBottom: 5}}>سوبر ادمن</Text>
    <Badge size= {45} style ={{backgroundColor: '#95E984'}}>{account_limit.super_admin}</Badge>

    </View>

<View>
        <Text style={{textAlign: 'center', marginBottom: 5}}>ادمن</Text>
    <Badge size= {45} style ={{backgroundColor: '#8389E6'}}>{account_limit.admin}</Badge>

    </View>

    <View>
        <Text style={{textAlign: 'center', marginBottom: 5}}>ممبر</Text>
    <Badge size= {45} style ={{backgroundColor: '#E981EC'}}>{account_limit.member}</Badge>

    </View>

  
</View>

        </View>
    )
}