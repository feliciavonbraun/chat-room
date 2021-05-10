import { io } from 'socket.io-client';
import { createContext, FunctionComponent, useEffect, useState } from "react";

// Interface

export interface WholeMessage {
    username?: string,
    text: string,
}

interface Room {
    roomTitle: string,
    password?: string
};

interface SocketValue {
    rooms: Room[],
    username: string,
    saveUsername: (username: string) => void,
    createRoom: (chatRoom: string, password?: string) => void;
    joinRoom: () => void;
    sendMessage: (newMessage: string) => void;
    leaveRoom: () => void;
    wholeMessage: WholeMessage[],
    allMessages: [],
    connect: () => void,
    leaveChat: () => void;
    getUsername: (username: string) => void

};
const socket = io('http://localhost:4000', { transports: ["websocket"] });

/* Create context */
export const SocketContext = createContext<SocketValue>({} as SocketValue);

/* Context provider */
const SocketProvider: FunctionComponent = ({ children }) => {
    const [username, setUsername] = useState('');
    const [allMessages, setAllMessages] = useState<any>([] as WholeMessage[]);

    // Här ska alla skapta rum sparas. Däremot uppdateras inte denna när rum läggs till...
    const rooms: Room[] = []
    console.log('array', rooms)

    function saveUsername(username: string) {
        setUsername(username);
        socket.emit('user-connected', username);
    };

    function createRoom(newRoomName: string, _password?: string) {
        socket.emit('create-room', newRoomName, _password);
        socket.on('create-room', (updatedChatRooms: []) => {
            // Här läggs rummen till från server och sparas i const rooms som ligger ovanför.
            updatedChatRooms.forEach(room => rooms.push(room));
            console.log(rooms)
        });
    };

    function joinRoom() {
        socket.emit('join-room', 'katt');
    }

    connect();
    function connect() {
        socket.on('user-connected', () => {
            console.log('anslutning lyckad ');
        });
    };

    function getUsername(username: string) {
        setUsername(username);
    };

    function sendMessage(newMessage: string) {

        // const content = {
        //     // author: username,
        //     message: newMessage
        // }

        socket.emit('chat-message', newMessage); // newmessage får man ut meddelandet. content får man ut object object. 
        setAllMessages([...allMessages, newMessage]) // denna gör ingeting??
        // setNewMessage('');
    };

    useEffect(() => {
        socket.on('chat-message', function(data) {
            setAllMessages([...allMessages, data])
            window.scrollTo(0, document.body.scrollHeight) // funkar denna??
        })
    });

    // useEffect(() => {
    //     socket.on('receive-message', (data) => {
    //         setAllMessages([...allMessages, data])
    //         console.log([...allMessages, data])
    //     });
    // }, [allMessages]);

    function leaveRoom() {
        socket.emit('leave-room')
    }

    function leaveChat() {
        socket.on('disconnect', () => {
        });
        socket.disconnect();
    }

    return (
        <SocketContext.Provider value={{
            rooms: [],
            wholeMessage: [],

            username,
            connect,
            saveUsername,
            createRoom,
            joinRoom,

            sendMessage,
            allMessages,

            leaveRoom,
            leaveChat,
            getUsername,

        }}>
            { children}
        </SocketContext.Provider>
    )
};
export default SocketProvider;
