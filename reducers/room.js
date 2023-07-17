import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {REACT_APP_URL} from '@env'
import axios from 'axios'

import socket from '../socket'



export const getCountriesFetch = createAsyncThunk('room/getCountries', async () => {
  const response = await  axios.get(`${REACT_APP_URL}/countries`)
  return response.data
})


export const getRoomsFetch = createAsyncThunk('room/getRooms', async ({country, navigation}) => {
  const response = await  axios.get(`${REACT_APP_URL}/rooms/${country}`)
  navigation.navigate('rooms', {country})
  return response.data
})


export const getRoomFetch = createAsyncThunk('room/getRoom', async ({room_id}) => {
  const response = await  axios.get(`${REACT_APP_URL}/room/${room_id}`)
  return response.data
})

export const getAllRoomsFetch = createAsyncThunk('room/getAllRooms', async () => {
  const response = await  axios.get(`${REACT_APP_URL}/rooms`)
  return response.data
})

export const getMasterReports = createAsyncThunk('room/get_master_reports', async (id) => {
  const response = await  axios.get(`${REACT_APP_URL}/mastersReports/${id}`)
  return response.data
})


export const delete_reports = createAsyncThunk('room/delete_reports', async (id) => {
  const response = await  axios.delete(`${REACT_APP_URL}/mastersReports/${id}`)
  return response.data
})

export const get_history =  createAsyncThunk('room/get_history', async (id) => {
  const response = await  axios.get(`${REACT_APP_URL}/userHistory/${id}`)
  return response.data
})


 export const delete_history = createAsyncThunk('room/delete_history', async (id) => {
  const response = await  axios.delete(`${REACT_APP_URL}/userHistory/${id}`)
  return response.data
})


export const blocked_devices = createAsyncThunk('room/get_blocked_devices', async () => {
  const response = await  axios.get(`${REACT_APP_URL}/devices_blocked`)
  return response.data
})

      
 export const delete_block_device = createAsyncThunk('room/delete_blocked_devices', async ({id ,  set_snack}) => {

     await  axios.delete(`${REACT_APP_URL}/device_blocked/${id}`)

     set_snack(true)
  return id
})


export const block_device = createAsyncThunk('room/block_device', async ({body, set_snack, set_state}) => {
   const response = await  axios.post(`${REACT_APP_URL}/device_blocked/`, body)

   socket.emit('block-alert' , ({roomId: body.room , device: body.device, blocked_by: body.blocked_by , name: body.name}))
   
   if(set_snack && set_state){
    set_state('تم حظر المستخدم')

   set_snack(true)
   }
  return response.data
})


export const edit_room = createAsyncThunk('room/edit_room', async ({id ,body}) => {

 return axios.put(`${REACT_APP_URL}/room/${id}`, body)
  .then(res => {
    return res. data
  })


})



const initialState = {
  countries: [],
  country: {},
  rooms: [] ,
  room: null,
  allRooms: [], 
  reports : [], 
  history: [], 
  blocked_devices: [],
  conversations: [],
  current_conversation: {}, 
  msgs: [],
  mention: false,
  room_stopped: [],
  rooms_count: {},
  countries_count: {},
  online_count: 0
}

const  RoomSlice = createSlice({
    name: 'room',
    initialState,
    reducers : {
      
        set_current: (state, action) => {
          state.current_conversation = action.payload
        }
        ,
        set_conversations: (state, action) => {
          state.conversations = action.payload
        },
        set_msgs : (state, action) => {
          state.msgs = action.payload
        }, 
        set_mention : (state, action) => {
          state.mention = action.payload
        },
        set_room_stopped : (state , action) => {
          state.room_stopped = action.payload
        },
        set_rooms_count : (state , action) => {
          state.rooms_count = action.payload
        },
        set_countries_count : (state , action) => {
          state.countries_count = action.payload
        },
        set_online_count: (state , action) => {
          state.online_count = action.payload
        },
    },
    extraReducers: (builder) => {
      builder.addCase(getCountriesFetch.fulfilled, (state, action) => {
        state.countries = action.payload
      })
      builder.addCase(getRoomsFetch.fulfilled, (state, action) => {
        state.rooms = action.payload
      })
      builder.addCase(getAllRoomsFetch.fulfilled, (state, action) => {
        state.allRooms = action.payload
      })
      builder.addCase(getRoomFetch.fulfilled, (state, action) => {
        state.room = action.payload
      })
      builder.addCase(getMasterReports.fulfilled, (state, action) => {
        state.reports = action.payload
      })

      builder.addCase(delete_reports.fulfilled, (state, action) => {
        state.reports = []
      })

      builder.addCase(get_history.fulfilled, (state, action) => {
        state.history = action.payload
      })

      builder.addCase(delete_history.fulfilled, (state, action) => {
        state.reports = []
      })

      builder.addCase(blocked_devices.fulfilled, (state, action) => {
        state.blocked_devices = action.payload
      })

      builder.addCase(delete_block_device.fulfilled, (state, action) => {
        
        state.blocked_devices = state.blocked_devices.filter(b => b._id !== action.payload)
      })

      builder.addCase(block_device.fulfilled, (state, action) => {
        state.blocked_devices = [...state.blocked_devices , action.payload]
      })

      builder.addCase(edit_room.fulfilled, (state, action) => {
        state.room = action.payload
      })

    }
  })





  
export const {set_current, set_conversations, set_msgs, set_mention, set_room_stopped, set_rooms_count, set_countries_count,
set_online_count} = RoomSlice.actions




export default RoomSlice.reducer  