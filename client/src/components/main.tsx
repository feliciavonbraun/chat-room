import { CSSProperties, useState } from "react";
import ChatContainer from "./ChatContainer";
import NewChatForm from "./NewChatForm";
import Sidebar from "./Sidebar";

interface Props {
    signOut: () => void;
};

function Main(props: Props) {
    const [showForm, setShowForm] = useState(false);
    const [leaveCurrentRoom, setLeaveCurrentRoom] = useState(false);

    function toggleNewChatForm() {
        setShowForm(!showForm);
    };

    return (
        <main style={rootStyle}>
            <Sidebar
                openForm={(value) => setShowForm(value)}
                signOut={props.signOut}
                joinChat={(value) => setLeaveCurrentRoom(value)}
                clickedFormButton={showForm}
            />
            {showForm
                ?
                <NewChatForm
                    closeForm={toggleNewChatForm}
                    joinChat={() => setLeaveCurrentRoom(false)}
                />
                :
                <ChatContainer
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