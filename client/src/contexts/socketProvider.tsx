import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useEffect, useState } from "react";

// Interface

export interface Message {
    username: string,
    text: string,
}

interface Room {
    roomTitle: string,
    password?: string
};

interface SocketValue {
    rooms: Room[],
    username: string,
    saveUsername: (username: string) => void,
    createRoom: (chatRoom: string, password?: string) => void;
    joinRoom: (chatRoom: string, password?: string) => void;
    sendMessage: (newMessage: string) => void;
    leaveRoom: () => void;
    allMessages: Message[],
    connect: () => void,
    leaveChat: () => void;
    getUsername: (username: string) => void

};
const socket = io('http://localhost:4000', { transports: ["websocket"] });

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<Message[]>([]);

    // Här ska alla skapta rum sparas. Däremot uppdateras inte denna när rum läggs till...
    const rooms: Room[] = []
    // console.log('array', rooms)

    function saveUsername(username: string) {
        setUsername(username);
        socket.emit('user-connected', username);
    };

    function createRoom(newRoomName: string, _password?: string) {
        socket.emit('create-room', newRoomName, _password);
        
    };

    function joinRoom(chatRoom: string, password?: string) {
        socket.emit('join-room', chatRoom, password);
    }

   
    function connect() {
        socket.on('user-connected', () => {
            console.log('anslutning lyckad ');
        });
    };

    function getUsername(username: string) {
        setUsername(username);
    };

    function sendMessage(text: string) {
        const message: Message = { username, text };
        socket.emit('chat-message', message);
        setAllMessages([...allMessages, message]); // denna gör ingeting??
        // setNewMessage('');
    };

    useEffect(() => {
        // lägg till ON lyssnare här:
        socket.on('chat-message', function(message: Message) {
            setAllMessages((prevMessages) => [...prevMessages, message])
        })
        socket.on('create-room', () => {
            
        });
        socket.on('disconnect', () => {});
    },[]);

    function leaveRoom() {
        socket.emit('leave-room')
    }

    function leaveChat() {
        socket.disconnect();
    }

    return (
        <SocketContext.Provider value={{
            rooms,
            username,
            connect,
            saveUsername,
            createRoom,
            joinRoom,

            sendMessage,
            allMessages,

            leaveRoom,
            leaveChat,
            getUsername,
        }}>
            { children}
        </SocketContext.Provider>
    )
};
export default SocketProvider;
