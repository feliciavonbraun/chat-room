const express = require('express');
const http = require('http');
const { Server } = require('socket.io')

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
    console.log('user connected', socket.id);

    socket.broadcast.emit('user-connected', socket.id);

    socket.emit('welcome-message', 'HALLOJ bruh');

    socket.on('message', (message) => {
        console.log('Client sent the following message: ', message)
        io.emit('message', message)
    })
});
// ------------


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});