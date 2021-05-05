import Main from "./main";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";

function Layout() {
    const [socket] = useState(io("ws://localhost:4000", { transports: ["websocket"] }))
    const [messages, setMessages] = useState<string[]>([])
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log('anslutning lyckad ')
        })
        socket.on('disconnected', () => {
            console.log('anslutning upphörde ')
        })
        socket.on('message', (message) => {
            setMessages([...messages, message])
            console.log(message)
        })
    }, [socket])
    
    function emitAnEventToServer() {
        socket.emit('message', "David says hi!");
    }

    return(
        <div>
            <Main />
            <button onClick={emitAnEventToServer}>KNAPP</button>
        </div>
    )
};
export default Layout;