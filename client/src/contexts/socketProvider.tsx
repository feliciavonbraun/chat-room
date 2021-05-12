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
    isCorrectPassword?: boolean,
    saveUsername: (username: string) => void,
    joinOpenRoom: (roomName: string) => void;
    joinLockedRoom: (roomName: string, password: string) => void;
    sendMessage: (username: string, text: string, roomName: string) => void;
    leaveRoom: () => void;
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
    const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(true);

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
    }; 

        
    function sendMessage(username: string, text: string, roomName: string, ) {
        const message: Message = {
            roomName, username, text 
        };
        socket.emit('chat-message', message);
        setAllMessages([...allMessages, message]); 

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

        socket.on('join-locked-room-response', ({ roomName, success }) => {
            if (success) {
                setActiveChatRoom(roomName);
                setIsCorrectPassword(true);
            } else {
                setIsCorrectPassword(false);
            }
        });
    }, []);

    function leaveRoom() {
        socket.emit('leave-room', activeChatRoom, username);
    }

    return (
        <SocketContext.Provider value={{
            openRooms,
            lockedRooms,
            activeChatRoom,
            username,
            isCorrectPassword,
            
            saveUsername,
            joinOpenRoom,
            joinLockedRoom,

            sendMessage,
            allMessages,

            leaveRoom,
        }}>
            { children}
        </SocketContext.Provider>
    )
};
export default SocketProvider;
