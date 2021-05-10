import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useEffect, useState } from "react";

// Interface

export interface Message {
    username: string,
    text: string,
}

interface Room {
    roomName: string,
    password?: string
};

interface SocketValue {
    rooms: Room[],
    username: string,
    saveUsername: (username: string) => void,
    joinRoom: (roomName: string, password?: string) => void;
    sendMessage: (newMessage: string) => void;
    leaveRoom: () => void;
    allMessages: Message[],
    leaveChat: () => void;
};
const socket = io('http://localhost:4000', { transports: ["websocket"] });

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<Message[]>([]);

    const [rooms] = useState<Room[]>([])
    
    function saveUsername(username: string) {
        setUsername(username);
        socket.emit('user-connected', username);
    };

    function joinRoom(roomName: string, password?: string) {
        socket.emit('join-room', roomName, password);
    }; 

    function sendMessage(text: string) {
        const message: Message = { username, text }
        socket.emit('chat-message', message); // newmessage får man ut meddelandet. content får man ut object object. 
        setAllMessages([...allMessages, message]) // denna gör ingeting??
        // setNewMessage('');
    };

    useEffect(() => {
        // lägg till ON lyssnare här:        
        socket.on('chat-message', function(message: Message) {
            setAllMessages((prevMessages) => [...prevMessages, message])
            window.scrollTo(0, document.body.scrollHeight) // funkar denna??
        });

        socket.on('all-rooms', createdRooms => {
            console.log(createdRooms)
        })
            
        socket.on('disconnect', () => {});
    },[rooms]);

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
