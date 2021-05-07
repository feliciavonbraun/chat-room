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


    // 'createRoom'
    // 'joinRoom'


    // SEND MESSAGE
    socket.emit('chat-message', (message) => {
        console.log('message:' + message)
    }); 


    // 'leaveRoom'

    /* DISCONNECT */
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});
// ------------


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});