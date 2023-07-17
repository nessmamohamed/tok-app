import { StyleSheet } from "react-native";

let yellow = '#fbeb58',
gray = '#F1F1F19D', 
light_blue = '#D1FFFD',
red = 'dc3545'

export const Styles = StyleSheet.create({

    home_view : {
        backgroundColor: '#fbeb58',
        flex: 1, 
        paddingTop: 10
    }, 
    logo_back :{
         borderRadius: 50  ,
          backgroundColor: 'white',
              height: 60 , width: 60 , 
    alignItems: 'center',
     alignContent: 'center', 
     justifyContent: 'center' ,
      overflow: 'hidden',
 
    },
    advert: {
        backgroundColor: '#FFFFFF',
    flex: 2, 
    marginHorizontal: 10, 
    height: 50,
     justifyContent: 'center',
      borderRadius: 10, 
      overflow: 'hidden'
    }
      ,countries_card:{
         backgroundColor: 'white' , 
         flex: 2,
          width: '100%',
           alignSelf: 'center',
            marginTop: 20,
             borderTopRightRadius: 55 ,
             borderTopLeftRadius: 55 ,
              shadowColor: '#1D181876',
              elevation:10,
              shadowOpacity: 0.3
         },
         yellow_bar: {
          height: 30 , 
           backgroundColor: '#FDFCAF' , 
           position: 'absolute', bottom: 0, 
           right: 0, 
         width: '100%',
          justifyContent: 'center',
           alignItems:'flex-start' , 
           paddingHorizontal: 20 ,
           shadowColor: '#A8A4A4' ,
            shadowOpacity: 0.2 , 
            elevation: 10,
 
        },
          selected_login:{
            backgroundColor: '#0dcaf0c7' ,
             paddingVertical: 10 ,
              paddingHorizontal: 20,
                borderRadius: 15 ,
                 color: 'white', 
                 overflow: 'hidden'
                
                }, 
                slick_button: {
                  backgroundColor: '#F4365FAE' ,
                  fontSize: 25, 
                  width: 25, 
                  height: 25, 
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                },
                room_container:
                {flexDirection: 'column' , flex: 1 , justifyContent: 'flex-end', 
                backgroundColor: 'white', paddingTop: Platform.OS === 'ios' ? 40 : 0 , backgroundColor: '#91d9e8'}

               , room_header:
               {flexDirection: 'row' , width: '100%', backgroundColor: '#91d9e8', height: 60, alignItems: 'center', 
               paddingHorizontal: 10, justifyContent: 'space-between'}

               ,side_border:
               {borderLeftWidth: 0.5 , borderLeftColor: '#FFFFFF99', height: 30},
               container_style : 
               {backgroundColor: 'white' , width: '80%' , alignSelf: 'center', 
                             borderRadius: 35 , paddingBottom :20  , borderWidth: 5 , borderColor: '#0dcaf0c7', 
                            justifyContent: 'flex-start'},
                            login_select:
                            {width: '80%' , borderWidth: 1 , borderColor: '#fbeb58' , height: 50 , alignSelf: 'center', marginTop: 30,
        borderRadius: 25 , flexDirection :'row' , justifyContent: 'space-around' , alignItems: 'center' },
        login_input_view: 
        {width: '85%' ,height: 50  ,marginBottom: 10 ,  alignSelf: 'center', borderRadius: 50, overflow: 'hidden', borderWidth: 1 , borderColor : '#fbeb58'}

})