import { CSSProperties } from "react";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";

interface Props {
    signOut: () => void;
}


function Main(props: Props) {
    return(
        <main style={rootStyle}>
           <Sidebar signOut={props.signOut} />
           <ChatContainer />
        </main>
    );
};

const rootStyle: CSSProperties = {
    display: 'flex',
};

export default Main;