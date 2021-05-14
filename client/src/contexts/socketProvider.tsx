import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useEffect, useState } from "react";

interface OpenRoom {
    roomName: string,
};
interface LockedRoom {
    roomName: string,
    password: string,
};

interface Message {
    roomName: string,
    username?: string,
    text?: string,
    eventNotification?: string
};

interface SocketValue {
    openRooms: OpenRoom[],
    lockedRooms: LockedRoom[],
    allMessages: Message[],
    activeChatRoom: string,
    username: string,
    isCorrectPassword?: boolean,
    saveUsername: (username: string) => void,
    joinOpenRoom: (roomName: string, username: string) => void;
    joinLockedRoom: (roomName: string, password: string, username: string) => void;
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
    };

    function joinOpenRoom(roomName: string, username: string) {
        socket.emit('join-open-room', roomName, username);
        setActiveChatRoom(roomName)

        const eventNotification = `${username} joined room`;
        sendEventMessage(roomName, eventNotification)
    };

    function joinLockedRoom(roomName: string, password: string, username: string) {
        socket.emit('join-locked-room', roomName, password, username);
        setActiveChatRoom(roomName)

        const eventNotification = `${username} joined room`;
        sendEventMessage(roomName, eventNotification)
    }; 


    function sendEventMessage(roomName: string, eventNotification: string) {
        const message: Message = {
            roomName,
            eventNotification
        };
        socket.emit('event-notification', message, roomName)
    }
        
    function sendMessage(username: string, text: string, roomName: string, ) {
        const message: Message = {
            roomName, 
            username, 
            text 
        };
        socket.emit('chat-message', message);
        setAllMessages([...allMessages, message]);
    };


    function leaveRoom() {
        socket.emit('leave-room', activeChatRoom, username);

        const copyAllMessages = [...allMessages]
        const updatedAllMessages = copyAllMessages.filter((message) => message.roomName !== activeChatRoom)
        setAllMessages(updatedAllMessages);
        const eventNotification = `${username} left room`;
        sendEventMessage(activeChatRoom, eventNotification);

    };

    useEffect(() => {
        // lägg till ON lyssnare här:        
        socket.on('send-message', (message: Message) => {
            setAllMessages((prevMessages) => [...prevMessages, message])
        });

        socket.on('all-open-rooms', createdRooms => {
            setOpenRooms(createdRooms);
        });

        socket.on('all-locked-rooms', createdRooms => {
            setLockedRooms(createdRooms);
        });

        socket.on('send-event-notification', function(message: Message) {
            setAllMessages((prevMessages) => [...prevMessages, message])
        });

        socket.on('join-locked-room-response', ({ roomName, success }) => {
            setIsCorrectPassword(false);
            if (success) {
                setActiveChatRoom(roomName);
                setIsCorrectPassword(true);
            } else {
                setIsCorrectPassword(false);
            }
        });


    }, []);

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
