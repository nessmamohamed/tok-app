
import { View, SafeAreaView, Pressable, ScrollView } from "react-native";
import { Styles } from "../styles/style";
import { Text , TextInput, Menu, Checkbox, Button} from "react-native-paper";
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_user } from "../reducers/user";


export default function Edit_account (props){

    let user = useSelector(state => state.user.user)
    let room = useSelector(state => state.rooms.room) || {}
    
    let dispatch = useDispatch()
  
   useEffect(() => {
      if(user) {
        set_permissions(user.permissions)
      set_user_type(user.type)
      setText(user.name)
      
      }
      
   }, [user]);

    const [visible, setVisible] = React.useState(false);
    const [name, setText] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [user_type, set_user_type] = React.useState('');
    const [permissions , set_permissions] = React.useState({})
    const [new_per , set_new_per] = React.useState('')
    const [error , set_error] = React.useState(false)
    const [success, set_success] = React.useState(false)
    let me = useSelector(state =>  state.user.me)


    let users_permessions = {
        member: {
          block_device: false,
          kick_out: false,
          stop: false,
          mic: false,
          public_msg: false,
          remove_msgs: false,
          cancel_block: false,
          logout_history: false,
          accounts_control: false,
          accounts_control: false,
          member_control: false,
          admin_control: false,
          super_admin_control: false,
          master_control: false,
          room_settings: false,
          masters_reports: false
        }, admin : {
          block_device: true,
          kick_out: true,
          stop: true,
          mic: true,
          public_msg: true,
          remove_msgs: true,
          cancel_block: false,
          logout_history: false,
          accounts_control: false,
          accounts_control: false,
          member_control: false,
          admin_control: false,
          super_admin_control: false,
          master_control: false,
          room_settings: false,
          masters_reports: false
        },
        super_admin: {
          block_device: true,
          kick_out: true,
          stop: true,
          mic: true,
          public_msg: true,
          remove_msgs: true,
          cancel_block: true,
          logout_history: true,
          accounts_control: false,
          accounts_control: false,
          member_control: false,
          admin_control: false,
          super_admin_control: false,
          master_control: false,
          room_settings: false,
          masters_reports: false
        },
        master_boy: {
          block_device: true,
          kick_out: true,
          stop: true,
          mic: true,
          public_msg: true,
          remove_msgs: true,
          cancel_block: true,
          logout_history: true,
          accounts_control: true,
          accounts_control: true,
          member_control: true,
          admin_control: true,
          super_admin_control: true,
          master_control: true,
          room_settings: true,
          masters_reports: true
        },
        master_girl: {
          block_device: true,
          kick_out: true,
          stop: true,
          mic: true,
          public_msg: true,
          remove_msgs: true,
          cancel_block: true,
          logout_history: true,
          accounts_control: true,
          accounts_control: true,
          member_control: true,
          admin_control: true,
          super_admin_control: true,
          master_control: true,
          room_settings: true,
          masters_reports: true
        }
      }



      onChangePermission = (p) => {
        set_new_per(p)
  
      }
  
      useEffect(() => {
         if(new_per !== ''){
          let new_perm = permissions
          new_perm[new_per] = !permissions[new_per]
         set_permissions(new_perm)
         set_new_per('')
         }
         }, [new_per]);

    

         const onChangeType = (type) => {
            set_user_type(type)
    
            set_permissions(users_permessions[type])
    
            closeMenu()
    
        }

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);


    const edit_account = () =>{

        set_success(false)
        set_error(false)

        if(name.toLowerCase() !== 'master'){
            let body = {
                name, 
                room_password: password, 
                type: user_type, 
                permissions,
                room_id : room._id,
                edited_by: me._id,
                user_id: user._id,
                by: me.name
            
             }


           
                dispatch(edit_user({body , set_error, set_success }))
             
             
             
        }else{
          set_error({msg: 'الماستر موجود بالفعل '})
        }
       

       }



    return(
        <SafeAreaView style ={Styles.home_view}>
              
       {user ? 
       <>
        <View style ={{flexDirection: 'row', alignItems: 'center', marginTop: 30, paddingHorizontal: 20}}>
        <Pressable onPress = {() =>  props.navigation.goBack()}>
        <FontAwesome name="angle-double-left" size={24} color="black"  />
        </Pressable>

        <Text variant="titleLarge"  style ={{textAlign: 'center', flex: 2}}> تعديل الحساب </Text>
       </View>              
              <View style ={Styles.countries_card}>

        <View style={{marginTop: 30, paddingHorizontal: 20, flex: 2}}>
       
       <TextInput
       value={name}
      onChangeText={text => setText(text)}
      mode='outlined'
      outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
      right={<TextInput.Icon icon = {() =><FontAwesome name="user" size={24} color="#9C9C9C" />}/>}

      />

<TextInput
      label=" كلمة المرور"
      onChangeText={text => setPassword(text)}
      mode='outlined'
      outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
      right={<TextInput.Icon icon = {() =><Entypo name="eye" size={24} color="#9C9C9C" />}/>}
      />


         <Menu

          visible={visible}
          onDismiss={closeMenu}
          anchor={
      <Pressable onPress = {openMenu}>
         <View   pointerEvents="none">
             <TextInput
      label={user_type}
      onChangeText={text => setText(text)}
      mode='outlined'
      outlineColor="#0B9DF1" activeOutlineColor="#0B9DF1" 
      right={<TextInput.Icon icon = {() =><MaterialIcons name="keyboard-arrow-down" size={24} color="#9C9C9C" />}/>}
      />
       </View>
      </Pressable>
          }>
       <Menu.Item onPress={() => onChangeType('master_boy')} title="master_boy" />
          <Menu.Item onPress={() => onChangeType('master_girl')} title="master_girl" />
          <Menu.Item onPress={() => onChangeType('admin')} title="admin" />
          <Menu.Item onPress={() => onChangeType('super_admin')} title="super_admin" />
          <Menu.Item onPress={() => onChangeType('member')} title="member" />

        </Menu>


        <Text variant="bodyMedium" style ={{textAlign: 'center' , marginVertical: 15, fontWeight: 'bold'  }} >الصلاحيات</Text>
         
         <ScrollView >
     {/** permission ----------------------------------------------------------------- */}
     <View style ={{flexDirection: 'row', justifyContent: 'space-between',}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
        onPress={() => onChangePermission('block_device')}
           label="حظر جهاز" status={permissions.block_device ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
           disabled = {user_type === "member"} 
           />
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}}
         style ={{width: 180 , height: 40}} label="طرد" status={permissions.kick_out ? "checked" : 'unchecked'} 
         color='#557EF0' uncheckedColor='#557EF0'
         disabled = {user_type === "member"} 
         onPress={() => onChangePermission('kick_out')}/>
        </View>

        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
         label="ايقاف" status={permissions.stop ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0' 
         disabled = {user_type === "member"} 
         onPress={() => onChangePermission('stop')}/>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}} 
        label="مسح النص" status={permissions.remove_msgs ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
        disabled = {user_type === "member"}
        onPress={() => onChangePermission('remove_msgs')}/>
        </View>

        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}}
         style ={{width: 180 , height: 40}} label="دور المايك" status={permissions.mic ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
         disabled = {user_type === "member"} 
         onPress={() => onChangePermission('mic')}/>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}} 
        label="رسالة عامة" status={permissions.public_msg ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
        disabled = {user_type === "member"}
        onPress={() => onChangePermission('public_msg')}/>
        </View>

        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}}
         style ={{width: 180 , height: 40}} label="الغاء حظر" status={permissions.cancel_block ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
         disabled = {user_type === 'member' || user_type === 'admin'}
         onPress={() => onChangePermission('cancel_block')}/>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
         label="سجل الخروج" status={permissions.logout_history ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
         disabled = {user_type === 'member' || user_type === 'admin'}
         onPress={() => onChangePermission('logout_history')}/>
        </View>

        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}} 
        label="ادارة الحسابات" status={permissions.accounts_control ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
        disabled = {user_type !== 'master_girl' && user_type !== 'master_boy' }
        onPress={() => onChangePermission('accounts_control')}/>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
         label="ادارة ممبر" status={permissions.member_control ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
         disabled = {user_type !== 'master_girl' && user_type !== 'master_boy' }
         onPress={() => onChangePermission('member_control')}
         />
        </View>

        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
         label="ادارة سوبر ادمن" status={permissions.super_admin_control ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
         disabled = {user_type !== 'master_girl' && user_type !== 'master_boy' }
         onPress={() => onChangePermission('super_admin_control')}/>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}}
         label="ادارة ادمن" status={permissions.admin_control ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
         disabled = {user_type !== 'master_girl' && user_type !== 'master_boy' }
         onPress={() => onChangePermission('admin_control')}
         />

        </View>

        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}} 
        label="ادارة ماستر" status={permissions.master_control ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
        disabled = {user_type !== 'master_girl' && user_type !== 'master_boy' }
        onPress={() => onChangePermission('master_control')}/>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}} 
        label="اعدادات الغرفة" status={permissions.room_settings ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
        disabled = {user_type !== 'master_girl' && user_type !== 'master_boy' }
        onPress={() => onChangePermission('room_settings')}/>
        </View>

        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Checkbox.Item mode="android" labelStyle={{textAlign: 'right', fontSize: 13}} style ={{width: 180 , height: 40}} 
        label="تقارير المشرفين" status={permissions.masters_reports ? "checked" : 'unchecked'} color='#557EF0' uncheckedColor='#557EF0'
        disabled = {user_type !== 'master_girl' && user_type !== 'master_boy' }
        onPress={() => onChangePermission('masters_reports')}/>
        </View>

         </ScrollView>


         
          </View>  


          
          {error ? 
    <View style ={{backgroundColor: '#FFEEEE', margin: 15, }}>
<Text 
style ={{textAlign: 'center', color: 'brown', paddingVertical: 10, borderWidth: 1 ,
 borderColor: 'brown', }}>
    {error.msg}
 </Text>

</View> : ''}

{success ? 
    <View style ={{backgroundColor: '#F5FFEE', margin: 15, }}>
<Text 
style ={{textAlign: 'center', color: 'green', paddingVertical: 10, borderWidth: 1 ,
 borderColor: 'green', }}>
    {success}
 </Text>

</View> : ''} 

          <Button mode='elevated' onPress={edit_account}
       labelStyle={{color: 'black'}}
         style ={{width: 180 , height: 40 , marginVertical: 40 , alignSelf: 'center' , 
                 backgroundColor: '#fbeb58' , shadowOpacity: 0}} > تعديل الحساب </Button>

              </View>
              </> : ''}
        </SafeAreaView>
    )
}