import { CSSProperties } from "react";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";


function Main() {


    return(
        <main style={rootStyle}>

           <Sidebar />
           <ChatContainer />
        </main>
    );
};

const rootStyle: CSSProperties = {
    display: 'flex',
};

export default Main;