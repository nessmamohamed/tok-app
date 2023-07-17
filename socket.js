

import { io} from 'socket.io-client';

const socket = io.connect('https://tok-back.onrender.com/')

socket.on('connect' , () => {
    console.log('connected')
})

export default socket