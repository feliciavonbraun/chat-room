import { CSSProperties, useState } from "react";
import ChatContainer from "./ChatContainer";
import NewChatForm from "./NewChatForm";
import Sidebar from "./Sidebar";


interface Props {
    signOut: () => void;
}


function Main(props: Props) {
    const [showForm, setShowForm] = useState(false)
    const [leaveCurrentRoom, setLeaveCurrentRoom] = useState(false) //byt namn sen

    function toggleNewChatForm() {
        setShowForm(!showForm);
    };
    
    return(
        <main style={rootStyle}>
           <Sidebar 
                openForm={toggleNewChatForm} 
                signOut={props.signOut}
                joinChat={() => setLeaveCurrentRoom(false)}
            />
           {showForm 
            ?   <NewChatForm closeForm={toggleNewChatForm}/>
            :   <ChatContainer 
                    leaveChat={leaveCurrentRoom}
                    setLeaveChat={() => setLeaveCurrentRoom(true)}
                />
           }
        </main>
    );
};

const rootStyle: CSSProperties = {
    display: 'flex',
};

export default Main;