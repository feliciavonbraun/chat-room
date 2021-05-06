import { CSSProperties } from "react";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { SocketContext } from "../contexts/socketProvider";

function Main() {
    const { username } = useContext(SocketContext);

    return(
        <main style={rootStyle}>
           <p>{username}</p>
           <Sidebar />
           <ChatContainer />
        </main>
    );
};

const rootStyle: CSSProperties = {
    display: 'flex',
};

export default Main;