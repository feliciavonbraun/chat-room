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

const openRooms = [];
const lockedRooms = [];

io.on('connection', (socket) => {

    socket.emit('all-open-rooms', openRooms);
    socket.emit('all-locked-rooms', lockedRooms);

    /* SEND AND RECIEVE MESSAGES */
    socket.on('chat-message', (data) => {
        socket.in(data.roomName).emit('send-message', data)
    });

    /* JOIN OPEN ROOM */
    socket.on('join-open-room', (roomName, username) => {
        const existingRoom = openRooms.some(oneRoom => oneRoom.roomName === roomName);
        if (!existingRoom) {
            openRooms.push(
                {
                    roomName: roomName,
                }
            )
        };

        socket.join(roomName);
        io.emit('all-open-rooms', openRooms);
    });

    /* JOIN LOCKED ROOM */
    socket.on('join-locked-room', (roomName, password) => {
        const existingRoom = lockedRooms.some(oneRoom => oneRoom.roomName === roomName);
        if (!existingRoom) {
            lockedRooms.push(
                {
                    roomName: roomName,
                    password: password
                }
            )
        };

        if (!checkPassword(roomName, password)) {
            socket.emit('join-locked-room-response', { roomName, success: false });
            return;
        }

        socket.join(roomName);
        io.emit('all-locked-rooms', lockedRooms);
        socket.emit('join-locked-room-response', { roomName, success: true });
    });

    /* CHECK PASSWORD */
    const checkPassword = (roomName, password) => {
        const roomIndex = lockedRooms.findIndex((room) => room.roomName === roomName);
        const correctPassword = lockedRooms[roomIndex]?.password
        return correctPassword && correctPassword === password;
    };

    /* SEND EVENT NOTIFICATION */
    socket.on('event-notification', (data, roomName) => {
        socket.broadcast.to(roomName).emit('send-event-notification', data)
    });

    /* LEAVE ROOM */
    socket.on('leave-room', (roomName, username) => {
        socket.leave(roomName, socket.id);
        socket.broadcast.emit('event-notification', (`${username} has left ${roomName}`));
        socket.leave(roomName, socket.id);
        updateRoomsLists();
    });
});

// ------------

function updateRoomsLists() {
    for (const room of openRooms) {
        if (!io.sockets.adapter.rooms.get(room.roomName)) {
            openRooms.splice(openRooms.indexOf(room), 1)
        }
    }

    for (const room of lockedRooms) {
        if (!io.sockets.adapter.rooms.get(room.roomName)) {
            lockedRooms.splice(lockedRooms.indexOf(room), 1)
        }
    }

    io.emit('all-open-rooms', openRooms);
    io.emit('all-locked-rooms', lockedRooms);
};

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});