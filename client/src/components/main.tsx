import { useContext } from "react";
import { SocketContext } from "../contexts/socketProvider";
import Message from "./message";

// Antar att denna kommer att bestå av: Sidebar och chatt. Inte Message.

function Main() {
    const { username } = useContext(SocketContext);

    return(
        <div>
           <p>Hej</p>
           <p>{username}</p>
           <Message />
        </div>
    )
};
export default Main;