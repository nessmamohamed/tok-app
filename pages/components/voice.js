import { View , Image, Pressable} from 'react-native'
import mic from '../../assets/mic.png'




export default function Voice (){
    return(
        <View>
             <Pressable>
             <Image source={mic} style={{ marginHorizontal: 5 }} />
             </Pressable>
        </View>
    )
}