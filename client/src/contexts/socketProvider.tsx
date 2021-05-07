import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useState } from "react";

// Interface

interface Room {
    roomTitle: string,
    password?: string
};

interface SocketValue {
    rooms: Room[],
    username: string,
    saveUsername: (username: string) => void,
    createRoom: (chatRoom: string, password?: string) => void;
    joinRoom: () => void;
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
    console.log('array', rooms)

    function saveUsername(username: string) {
        setUsername(username);
        socket.emit('user-connected', username);
    };

    function createRoom(newRoomName: string, _password?: string) {
        socket.emit('create-room', newRoomName, _password);
        socket.on('create-room', (updatedChatRooms: []) => {
            // Här läggs rummen till från server och sparas i const rooms som ligger ovanför.
            updatedChatRooms.forEach(room => rooms.push(room));
            console.log(rooms)
        })
    };

    function joinRoom() {
        socket.emit('join-room', 'katt');
    }

    function sendMessage(newMessage: string) {
        socket.on('chat-message', () => {
            setAllMessages([...allMessages, newMessage])
            console.log([...allMessages, newMessage])
        });
        console.log('contexten nådd')
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
            rooms: [],
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