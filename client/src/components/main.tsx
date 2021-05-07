import { CSSProperties, useState } from "react";
import ChatContainer from "./ChatContainer";
import NewChatForm from "./NewChatForm";
import Sidebar from "./Sidebar";


interface Props {
    signOut: () => void;
}


function Main(props: Props) {
    const [showForm, setShowForm] = useState(false)

    function toggleNewChatForm() {
        setShowForm(!showForm);
    };
    
    return(
        <main style={rootStyle}>
           <Sidebar 
                openForm={toggleNewChatForm} 
                signOut={props.signOut}
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