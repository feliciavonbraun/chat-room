import { useContext } from "react";
import { SocketContext } from "../contexts/socketProvider";
import Main from "./main";

function Layout() {
    const { sendMessage } = useContext(SocketContext)
    
    function emitAnEventToServer() {
        sendMessage()  
    }

    return(
        <div>
            <Main />
            <button onClick={emitAnEventToServer}>KNAPP</button>
        </div>
    )
};
export default Layout;