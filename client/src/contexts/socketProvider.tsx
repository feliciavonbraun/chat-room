import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useState } from "react";

// Interface

interface Room {
    roomName: string,
    password?: string | null,
};

interface SocketValue {
    allRooms: Room[],
    username: string,
    saveUsername: (username: string) => void,
    createRoom: (chatRoom: string, password?: string) => void;
    joinRoom: (roomName: string) => void;
    sendMessage: (newMessage: string) => void;
    leaveRoom: () => void;
    disconnect: () => void;
};
const socket = io('http://localhost:4000', { transports: ["websocket"] });

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<any[]>([]);
    
    // Här ska alla skapta rum sparas. Däremot uppdateras inte denna när rum läggs till...
    const rooms: Room[] = []

    function saveUsername(username: string) {
        setUsername(username);
        socket.emit('user-connected', username);
    };

    function createRoom(newRoomName: string, _password?: string) {
        socket.emit('create-room', newRoomName, _password);
        socket.on('save-room', (allRooms) => {
            rooms.push(allRooms)
            console.log(rooms)
        });
        joinRoom(newRoomName)
    };

    function joinRoom(roomName: string) {
        socket.emit('join-room', roomName);
    };

    function sendMessage(newMessage: string) {
        socket.on('chat-message', () => {
            setAllMessages([...allMessages, newMessage])
        });
    };
    //function sendMessage() {
    //    socket.emit('send-message', "David says hi!");
    //    console.log('sendMessage');
    //}


    function leaveRoom() {
        socket.emit('leave-room')
    }

    function disconnect() {
        socket.on('disconnect', () => {
            console.log('anslutning upphörde ');
        });
    }

    return (
        <SocketContext.Provider value={{
            allRooms: [],
            username,
            saveUsername,
            createRoom,
            joinRoom,
            sendMessage,
            leaveRoom,
            disconnect,
        }}>
            { children}
        </SocketContext.Provider>
    )
};
export default SocketProvider;