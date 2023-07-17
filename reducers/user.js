import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {REACT_APP_URL} from '@env'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Network from 'expo-network';

import socket from '../socket';

const initialState = {
    isAuthenticated: null,
    isLoading: true,
    me: null,
    token: null,
    auth_error: null,
    login_error: null,
    ip: null,
    device: null, 
    users: [],
    user: null


}

//get network ------------------------------------
export const getNetwork = createAsyncThunk('user/getNetwork', async () => {
let ip = await Network.getIpAddressAsync();
return ip
})

//get device ------------------------------------
export const getDevice = createAsyncThunk('user/getDevice', async () => {
   
  return  axios.get(`${REACT_APP_URL}/machine`)
  .then(res =>{
    return res.data
  })
  })
  


//token-----------------------------------------------------
export const getToken = createAsyncThunk('user/getToken', async () => {
    const token = await  AsyncStorage.getItem('token')
    return token
  })

export const tokenConfig = (state) => {

    const token = state().user.token
  
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };

  //load user --------------------------------------------------
  export const loadUser = createAsyncThunk('user/loadUser', (_ , {rejectWithValue, getState}) => {

  
   return  axios.get(`${REACT_APP_URL}/auth`, tokenConfig(getState))
      .then(res => res.data)
      .catch(() =>  rejectWithValue('invalid token') )
      });
  

  // Login User-----------------------------------------------
export const loginUser = createAsyncThunk('user/login',  ({body, navigation, hide_modal}, {rejectWithValue}) => {


   return axios.post(`${REACT_APP_URL}/login`, body)
      .then(async (res) =>{
        hide_modal()
        await AsyncStorage.setItem('token' , res.data.token)
       navigation.navigate('room', {room_id : body.room_id, }) 

        return res.data
      })
      .catch(err => rejectWithValue(err.response.data));
  })
  
  //logout --------------------------------------------
  export const logout = createAsyncThunk('user/logout',  async() => {
     socket.emit('out-connect')
         await AsyncStorage.removeItem('token' )
     
   })


    //get users --------------------------------------------
  export const getRoomUsers = createAsyncThunk('user/RoomUsers',  (room_id) => {
    return axios.get(`${REACT_APP_URL}/users/${room_id}`)
    .then( (res) =>res.data)
})


//add_account ---------------------------------------------
export const new_account = createAsyncThunk('user/add_new_account',  ({body, set_error, set_success} , {rejectWithValue}) => {
 
  
  return axios.post(`${REACT_APP_URL}/user`, body)
  .then((res) => {
set_success('تم اضافة مستخدم جديد بنجاح') 
socket.emit('add-profile' , ({name: body.name, by: body.by, room: body.room_id}))

return res.data
 })
  .catch(err => {
    set_error(err.response.data)

    return rejectWithValue(err.response.data)
  })
})


//edit_user-----------------------------------------------

export const edit_user = createAsyncThunk('user/edit_user',  ({body, set_error, set_success} , {rejectWithValue}) => {
  
  return axios.put(`${REACT_APP_URL}/user/${body.user_id}`, body)
  .then((res) => {
set_success('تم تعديل المستخدم بنجاح') 
socket.emit('edit-profile' , ({name:body.name, by: body.by, room: body.room_id}))

return res.data
 })
  .catch(err => {
    set_error(err.response.data)
    return rejectWithValue(err.response.data)
  })
})

//delete account -------------------------------------------------

export const delete_user = createAsyncThunk('user/delete_user',  (id, {getState}) => {

  return axios.delete(`${REACT_APP_URL}/user/${id}`, tokenConfig(getState))
  .then( (res) => {
    console.log(res.data)
    return id 
  })
  .catch(err => console.log(err))

})


//get user -----------------------------------------------

export const getUser =  createAsyncThunk('user/get_user',  async({id, navigation, page}) => {
  let response = await axios.get(`${REACT_APP_URL}/user/${id}`)
  navigation.navigate(page)
  return response.data

})


//edit name -----------------------------------------
export const edit_name =  createAsyncThunk('user/edit_name',  async({id, body, set_error , set_success}) => {

  console.log(body)
  return axios.put(`${REACT_APP_URL}/name/${id}`, body)
  .then(res => {set_success('تم تعديل الملف بنجاح')
  return res.data
})
  .catch(err => set_error(err.response.data))


})

   //--------------------------------------------------
  
const userReducer = createSlice({
    name: 'user', 
    initialState, 
    reducers: {
        user_loading: (state) => {
          state.isLoading = true
        },
        clear_error: (state) =>{
          state.login_error = null
        }
    }, 
    extraReducers: (builder) => {
      builder.addCase(getNetwork.fulfilled , (state, action) => {
        state.ip = action.payload
    })

    builder.addCase(getDevice.fulfilled , (state, action) => {
      state.device = action.payload
  })
        builder.addCase(getToken.fulfilled , (state, action) => {
            state.token = action.payload
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.me = action.payload
            state.isAuthenticated = true
            state.auth_error = false
             
            
        })
        builder.addCase(loadUser.rejected, (state, action) => {
            state.isAuthenticated = null
            state.me = null
            state.isLoading = false
            state.auth_error = action.payload
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.me = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            state.auth_error = null
            state.login_error = null

        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.token = null
            state.isAuthenticated = null
            state.me = null
            state.isLoading = false
            state.login_error = action.payload
        })
        builder.addCase(logout.fulfilled , (state, action) => {
            state.token = null
            state.isAuthenticated = null
            state.me = null
            state.isLoading = false
       

  
        })


        builder.addCase(getRoomUsers.fulfilled , (state, action) => {
          state.users = action.payload     


      })


      builder.addCase(new_account.fulfilled , (state, action) => {
       state.users = action.payload ? [...state.users, action.payload] : [...state.users]
       
    
    })


    builder.addCase(new_account.rejected , (state, action) => {
     state = state  


  })


  
  builder.addCase(edit_user.fulfilled , (state, action) => {
    users = state.users.map(u => u._id === action.payload._id ? action.payload : u)
    state.users = users
 
 })


 builder.addCase(edit_user.rejected , (state, action) => {
  state = state  


})



    builder.addCase(delete_user.fulfilled , (state, action) => {
      state.users = state.users.filter(u => u._id !== action.payload)
  })


  builder.addCase(getUser.fulfilled , (state, action) => {
    state.user = action.payload
})
       

builder.addCase(edit_name.fulfilled , (state, action) => {
  state.me = action.payload
})
  
    }
})


export  const {user_loading, clear_error} = userReducer.actions
export default userReducer.reducer