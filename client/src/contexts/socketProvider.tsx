import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useEffect, useState } from "react";



interface OpenRoom {
    roomName: string,
};
interface LockedRoom {
    roomName: string,
    password: string,
};

export interface Message extends OpenRoom {
    username: string,
    text: string,
};

interface SocketValue {
    openRooms: OpenRoom[],
    lockedRooms: LockedRoom[],
    allMessages: Message[],
    activeChatRoom: string,
    username: string,
    passwordResponse: boolean,
    saveUsername: (username: string) => void,
    joinOpenRoom: (roomName: string) => void;
    joinLockedRoom: (roomName: string, password: string) => void;
    checkPassword: (roomName: string, password: string) => void;
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
    const [openRooms, setOpenRooms] = useState<OpenRoom[]>([])
    const [lockedRooms, setLockedRooms] = useState<LockedRoom[]>([])
    const [activeChatRoom, setActiveChatRoom] = useState('');
    const [passwordResponse, setPasswordResponse] = useState(false);

    function saveUsername(username: string) {
        setUsername(username);
        socket.emit('user-connected', username);
    };

    function joinOpenRoom(roomName: string) {
        socket.emit('join-open-room', roomName);
        setActiveChatRoom(roomName)
    };

    function joinLockedRoom(roomName: string, password: string) {
        socket.emit('join-locked-room', roomName, password);
        setActiveChatRoom(roomName)
    }; 

    function checkPassword(roomName: string, password: string) {
        socket.emit('check-password', roomName, password);
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

        socket.on('all-open-rooms', createdRooms => {
            setOpenRooms(createdRooms);
        });

        socket.on('all-locked-rooms', createdRooms => {
            setLockedRooms(createdRooms);
        });

        socket.on('password-response', response => {
            if (response === 'correct') {
                setPasswordResponse(true);
            } else {
                setPasswordResponse(false);
            }
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
            openRooms,
            lockedRooms,
            activeChatRoom,

            username,
            passwordResponse,
            saveUsername,
            joinOpenRoom,
            joinLockedRoom,
            checkPassword,

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
