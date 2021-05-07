import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useEffect, useState } from "react";

// Interface

export interface WholeMessage {
    username?: string,
    text: string,
}

interface Room {
    titel: string,
    password?: string
}

interface SocketValue {
    room: Room[],
    wholeMessage: WholeMessage[],
    username: string,
    allMessages: [],
    connect: () => void,
    createRoom: () => void;
    joinRoom: () => void;
    sendMessage: (newMessage: string) => void;
    leaveRoom: () => void;
    disconnect: () => void;
    getUsername: (username: string) => void
};
const socket = io('http://localhost:4000', { transports: ["websocket"] });

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<any>([] as WholeMessage[]);
    const room = 'Living room'

    connect();
    function connect() {
        socket.on('user-connected', () => {
            console.log('anslutning lyckad ');
        });
    };

    function getUsername(username: string) {
        setUsername(username);
    };

    function createRoom() {
        console.log('createRoom');
    };

    function joinRoom() {
        socket.emit('join_room', room);
    };

    function sendMessage(newMessage: string) {

        // const content = {
        //     // author: username,
        //     message: newMessage
        // }

        socket.emit('send-message', newMessage); // newmessage får man ut meddelandet. content får man ut object object. 
        setAllMessages([...allMessages, newMessage]) // denna gör ingeting??
        // setNewMessage('');
        console.log('sendMessage nådd')
    };

    useEffect(() => {
        socket.on('receive-message', (data) => {
            setAllMessages([...allMessages, data])
            console.log([...allMessages, data])
        });
    }, [allMessages]);

    // function sendMessage() {
    //    socket.emit('send-message', "David says hi!");
    //    console.log('sendMessage');
    // }


    function leaveRoom() {
        socket.emit('leave_room')
    }

    function disconnect() {
        socket.on('disconnect', () => {
            console.log('anslutning upphörde ');
        });
    }

    return (
        <SocketContext.Provider value={{
            room: [],
            wholeMessage: [],
            username,
            connect,
            createRoom,
            joinRoom,

            sendMessage,
            allMessages,

            leaveRoom,
            disconnect,
            getUsername,
        }}>
            { children}
        </SocketContext.Provider>
    )
};
export default SocketProvider;