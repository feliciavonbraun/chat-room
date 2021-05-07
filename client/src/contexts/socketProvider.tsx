import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useState } from "react";

// Interface
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
    sendMessage: () => void;
    leaveRoom: () => void;
    disconnect: () => void;
    getUsername: (username: string) => void
};
const socket = io('http://localhost:4000', { transports: ["websocket"] }); 

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('')
    // Username ska skickas till socket i backend. 
    // Spara alla meddelanden? 




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
        socket.emit('join_room');
    }

    function sendMessage() {
        socket.emit('send-message', "David says hi!");
        console.log('sendMessage');
    }

    function leaveRoom() {
        console.log('leaveRoom');
    }

    function disconnect() {
        socket.on('disconnect', () => {
            console.log('anslutning upphörde ');
        });
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
            disconnect,
            getUsername,
        }}>
        { children }
        </SocketContext.Provider>
    )
};
export default SocketProvider;