import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useState } from "react";

// 
interface Room {
    titel: string,
    password?: string
}

interface SocketValue {
    room: Room[],
    username: string,
    connect: () => void,
    createRoom: () => void;
    joinRoom: () => void;
    sendMessage: ( newMessage: string ) => void;
    leaveRoom: () => void;
    leaveChat: () => void;
    getUsername: (username: string) => void
};
const socket = io('http://localhost:4000', { transports: ["websocket"] }); 

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<any[]>([]);
    const room = 'Living room';
 

    connect();
    function connect(){
       socket.on('user-connected', () => {
           console.log('anslutning lyckad ');
       });
   };
    
    function getUsername(username: string) {
        setUsername(username);
    }

    function createRoom() {
        console.log('createRoom');
    }
    
    function joinRoom() {
        socket.emit('join_room', room);
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
        socket.emit('leave_room', room)
    }

    function leaveChat() {
        socket.on('disconnect', () => {
        });
        socket.disconnect();
    }

    return (
        <SocketContext.Provider value={{
            room: [],
            username,
            connect,
            createRoom,
            joinRoom,
            sendMessage,
            leaveRoom,
            leaveChat,
            getUsername,
        }}>
        { children }
        </SocketContext.Provider>
    )
};
export default SocketProvider;
