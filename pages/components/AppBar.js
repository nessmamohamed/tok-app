import { AppBar, IconButton } from "@react-native-material/core";
import logo from '../../assets/logo.png'
import { Image } from "react-native";

export default function AppBars () {
    return(
        <AppBar style= {{backgroundColor: '#fbeb58', height: 60, justifyContent: 'center' , paddingHorizontal: 20}} 
        title = 'TOK-CHAT'
        tintColor="#303030"

        leading={props => (
            <IconButton style={{backgroundColor: 'white'}}
              icon={props => <Image source = {logo} style={{width: 45 , height: 50}}/>}
              {...props}
            />
        )}
        />

    )
}