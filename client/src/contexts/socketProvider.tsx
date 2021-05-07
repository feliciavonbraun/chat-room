import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useState } from "react";

// Interface

// console.log(newMessage)
export interface Message {

}

interface SocketValue {
    username: string,
    // allMessages: any,
    connect: (username: string ) => void;
    createRoom: () => void;
    joinRoom: () => void;
    sendMessage: ( newMessage: string ) => void;
    leaveRoom: () => void;
    disconnect: () => void
};

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [socket] = useState(io("ws://localhost:4000", { transports: ["websocket"] }));
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<any[]>([]);

    console.log(username);


    function connect(username: string){
        setUsername(username);
        socket.on('user-connected', () => {
            console.log('anslutning lyckad ');
        });
    };

    function createRoom(){
        console.log('createRoom')
    }

    function joinRoom(){
        console.log('joinRoom')
    }

    function sendMessage(newMessage: string) {
        socket.on('chat-message', () => {
            setAllMessages([...allMessages, newMessage])
            console.log([...allMessages, newMessage])
        });
        console.log('contexten nådd')
    };

    function leaveRoom(){
        console.log('leaveRoom')
    }

    function disconnect(){
        socket.on('disconnect', () => {
            console.log('anslutning upphörde ')
        })
    }

    return (
        <SocketContext.Provider value={{
            username, 
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