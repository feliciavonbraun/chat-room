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

const openRooms = []
const lockedRooms = []

io.on('connection', (socket) => {

    socket.on('user-connected', username => {
        console.log(`Sign in: ${username}.`)
    }); 
    
    // MESSAGE
    socket.on('chat-message', (data) => {
        // socket.broadcast.emit('chat-message', data);
        socket.in(data.roomName).emit('chat-message', data)

        console.log( data.roomName + data)
    }); 
    
    /* JOIN OPEN ROOM */
    socket.on('join-open-room', (roomName) => {
        const existingRoom = openRooms.some(oneRoom => oneRoom.roomName === roomName);
        if(!existingRoom) {
            openRooms.push(
                {
                    roomName: roomName,
                }
            )
        };

        socket.join(roomName);
        io.emit('all-open-rooms', openRooms);
        console.log(`User has joined room ${roomName}`);
    });

    /* JOIN LOCKED ROOM */
    socket.on('join-locked-room', (roomName, password) => {
        const existingRoom = lockedRooms.some(oneRoom => oneRoom.roomName === roomName);
        if(!existingRoom) {
            lockedRooms.push(
                {
                    roomName: roomName,
                    password: password
                }
            )
        };

        socket.join(roomName);
        io.emit('all-locked-rooms', lockedRooms);
        console.log(`User has joined room ${roomName}`);
    });

    /* CHECK PASSWORD */
    socket.on('check-password', (roomName, password) => {
        const roomIndex = lockedRooms.findIndex((room) => room.roomName === roomName);
        const correctPassword = lockedRooms[roomIndex].password
        if (correctPassword === password) {
            socket.emit('password-response', 'correct')
        } else {
            socket.emit('password-response', 'wrong')
        }
    });

    /* LEAVE ROOM */
    socket.on('leave-room', (roomName, username) => {
        socket.leave(roomName, socket.id);
        console.log(`${username} has left ${roomName}`);
    });

    /* DISCONNECT */
    socket.on('disconnect', (data) => {
        console.log(data)
        // todo: Filtrera bort specifikt rum från 'alla rum'? 
        io.emit('all-rooms', ); // chatRooms
    });

});
// ------------




// function getopenRooms() {
//     const { rooms } = io.sockets.adapter;
//     const keys = Object.keys(rooms);
//     console.log('Nycklar', keys)
//     console.log('rum', rooms.keys())
    
//     return rooms
// }


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});