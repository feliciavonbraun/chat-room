import { CSSProperties, useState } from "react";
import ChatContainer from "./ChatContainer";
import NewChatForm from "./NewChatForm";
import Sidebar from "./Sidebar";

function Main() {
    const [showForm, setShowForm] = useState(false)

    function toggleNewChatForm() {
        setShowForm(!showForm);
    };
    
    return(
        <main style={rootStyle}>
           <Sidebar 
                openForm={toggleNewChatForm} 
            />
           {showForm 
            ?   <NewChatForm closeForm={toggleNewChatForm}/>
            :   <ChatContainer />
           }
        </main>
    );
};

const rootStyle: CSSProperties = {
    display: 'flex',
};

export default Main;