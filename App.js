
import {Provider as PaperProvider} from 'react-native-paper';
import {DefaultTheme} from 'react-native-paper';
import Navigation from './navigation';


import {Provider, useDispatch, useSelector} from 'react-redux'
import {configureStore,  } from '@reduxjs/toolkit'
import RoomReducer, { set_countries_count, set_online_count, set_rooms_count } from './reducers/room';
import { useEffect } from 'react';
import userReducer from './reducers/user';

import socket from './socket';


const store = configureStore({
  reducer: {rooms : RoomReducer, 
            user: userReducer  }
})

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#fbeb58', // Use transparent to disable the little highlighting oval
  },
};

export default function App (){



  return (

   <Provider store = {store}>
     <PaperProvider theme={theme} >
    <Navigation />

  </PaperProvider>
   </Provider>
  );
}

