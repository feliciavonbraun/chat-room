import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useState } from "react";

// Interface
interface Room {
    titel: string,
    password?: string
}
interface SocketValue {
    room: Room[],
    connect: (username: string ) => void;
    createRoom: () => void;
    joinRoom: () => void;
    sendMessage: () => void;
    leaveRoom: () => void;
    disconnect: () => void
};

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [socket] = useState(io("ws://localhost:4000", { transports: ["websocket"] }));
    // Spara alla meddelanden? 
    
    connect();
     function connect(){
        socket.on('user-connected', () => {
            console.log('anslutning lyckad ');
        });
    };

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
            connect,
            createRoom,
            joinRoom,
            sendMessage,
            leaveRoom,
            disconnect
        }}>
        { children }
        </SocketContext.Provider>
    )
};
export default SocketProvider;