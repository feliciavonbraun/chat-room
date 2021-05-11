import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useEffect, useState } from "react";

interface Room {
    roomName: string,
    password?: string
};

export interface Message extends Room {
    username: string,
    text: string,
};

interface SocketValue {
    rooms: Room[],
    allMessages: Message[],
    activeChatRoom: string,
    username: string,
    saveUsername: (username: string) => void,
    joinRoom: (roomName: string, password?: string) => void;
    sendMessage: (username: string, text: string, roomName: string) => void;
    leaveRoom: () => void;
    leaveChat: () => void;
};
const socket = io('http://localhost:4000', { transports: ["websocket"] });

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<Message[]>([]);
    const [rooms, setRooms] = useState<Room[]>([])
    const [activeChatRoom, setActiveChatRoom] = useState('');

    function saveUsername(username: string) {
        setUsername(username);
        socket.emit('user-connected', username);
    };

    function joinRoom(roomName: string, password?: string) {
        socket.emit('join-room', roomName, password);
        setActiveChatRoom(roomName)
    }; 

    function sendMessage(username: string, text: string, roomName: string, ) {
        const message: Message = {
            roomName, username, text 
        };
        socket.emit('chat-message', message);
        setAllMessages([...allMessages, message]); // viktig ibland
        // setNewMessage('');
    };

    useEffect(() => {
        // lägg till ON lyssnare här:        
        socket.on('chat-message', function(message: Message) {
            setAllMessages((prevMessages) => [...prevMessages, message])
        });

        socket.on('all-rooms', createdRooms => {
            setRooms(createdRooms);
        });
            
        socket.on('disconnect', () => {});
    },[]);

    function leaveRoom() {
        socket.emit('leave-room', activeChatRoom, username)
    }

    function leaveChat() {
        socket.disconnect();
    }

    return (
        <SocketContext.Provider value={{
            rooms,
            activeChatRoom,

            username,
            saveUsername,
            joinRoom,

            sendMessage,
            allMessages,

            leaveRoom,
            leaveChat,
        }}>
            { children}
        </SocketContext.Provider>
    )
};
export default SocketProvider;
