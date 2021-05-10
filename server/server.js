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
        password: null,
    },
];

io.on('connection', (socket) => {

    socket.on('user-connected', (username) => {
        userId = socket.id
        console.log(`Username: ${username} with id: ${userId} signed in.`)
    }); 

    // 'CREATE ROOM'
    socket.on('create-room', (roomName, _password) => {
        console.log(`Room ${roomName} was created with password ${_password}`)

        allRooms.push(
            {
                roomName: roomName,
                password: _password
            }
        );
        console.log(allRooms);

        socket.emit('save-room', allRooms);
    });

    // SEND MESSAGE
    socket.emit('chat-message', (message) => {
        console.log('message:' + message)
    }); 
  
     /* JOIN ROOM */
    socket.on('join-room', (roomName) => {
        socket.join(roomName);
        console.log(`User ${socket.id} has joined room ${roomName}`);
    });

    /* LEAVE ROOM */
    socket.on('leave-room', () => {
        findUser = signedInUsers.find((user) => user = socket.id);
        
        console.log(findUser, 'has left room');
        console.log(signedInUsers)
    });

    /* DISCONNECT */
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});
// ------------


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});