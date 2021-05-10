const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"],
    }
});

// ------------

const allRooms = [
    {
        roomName: 'Living room',
        password: null
    }
]

io.on('connection', (socket) => {

    socket.on('user-connected', username => {
        console.log(`Sign in: ${username}.`)
    }); 
    
    // MESSAGE
    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', data);
        
        console.log('consolelog servern:' + data)
    }); 
    
    /* JOIN ROOM */
    socket.on('join-room', (roomName, password) => {
        const existingRoom = allRooms.some(theRoom => theRoom.roomName === roomName);
        if(!existingRoom) {
            allRooms.push(
                {
                    roomName: roomName,
                    password: password
                }
            )
        }
        console.log(allRooms)

        socket.join(roomName);
        io.emit('all-rooms', allRooms);
        console.log(`User has joined room ${roomName}`);
    });

    /* LEAVE ROOM */
    socket.on('leave-room', () => {
        findUser = signedInUsers.find((user) => user = socket.id);
        
        console.log(findUser, 'has left room');
        console.log(signedInUsers)
    });

    /* DISCONNECT */
    socket.on('disconnect', (data) => {
        console.log(data)
        // todo: Filtrera bort specifikt rum från 'alla rum'? 
        io.emit('all-rooms', ); // chatRooms
    });

});
// ------------




// function getAllRooms() {
//     const { rooms } = io.sockets.adapter;
//     const keys = Object.keys(rooms);
//     console.log('Nycklar', keys)
//     console.log('rum', rooms.keys())
    
//     return rooms
// }


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});