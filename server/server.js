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
io.on('connection', (socket) => {
    socket.emit('user-connected', socket.id);
    console.log('hej', socket.id)

     // 'createRoom'

    // SEND MESSAGE
    socket.emit('chat-message', (message) => {
        console.log('message:' + message)
    }); 
  
     /* JOIN ROOM */
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('user has joined room ' + data);
    });

    /* LEAVE ROOM */
    socket.on('leave_room', () => {
        console.log('user has left room')
    })

    /* DISCONNECT */
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});
// ------------


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});