import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";

function ChatContainer() {
    const { sendMessage, allMessages, leaveRoom, activeChatRoom} = useContext(SocketContext);
    const [newMessage, setNewMessage] = useState('');
  
    // TODO: Spara meddelanden och mappa ut i 'messageContainer'

    function handleMessage(e: React.FormEvent) {
        e.preventDefault();

        // let messageContent = {
        //     // room: room,
        //     content: {
        //         // author: username,
        //         text: newMessage
        //     }
        // };

        sendMessage(newMessage)
        setNewMessage('');
        window.scrollTo(0,document.body.scrollHeight);

        console.log(`newMessage: ${newMessage}`);
    };

    return (
        <div style={rootStyle}>
            <div style={titleContainer}>
                {activeChatRoom}
            </div>
            <button 
                style={buttonStyle}
                onClick={() => leaveRoom()}
            >
                Leave room
            </button>
            <div style={messageContainer}>
                {allMessages.map(({ username, text }, index) => {
                    return (
                        <div key={index} style={messageBox}>
                            <p>{username}: {text}</p>
                        </div>
                    )
                })}
            </div>
            <form
                onSubmit={(e) => handleMessage(e)}
                style={formContainer}
            >
                <input
                    type='text'
                    placeholder='Message...'
                    style={inputStyle}
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                />
                <button
                    type='submit'
                    style={buttonStyle}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

const rootStyle: CSSProperties = {
    width: '100%',
    height: '100vh',
};

const titleContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
};

const messageContainer: CSSProperties = {
    height: '75%',
    margin: '0 1rem',
    backgroundColor: 'pink',
};

const messageBox: CSSProperties = {
    background: 'white',
    borderRadius: '.5rem',
};

const formContainer: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '15%',
    padding: '0 1rem',
};

const inputStyle: CSSProperties = {
    width: '75%',
    borderRadius: '.5rem',
    padding: '.5rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .05rem .2rem #00000040 inset',
};

const buttonStyle: CSSProperties = {
    width: '20%',
    borderRadius: '.3rem',
    padding: '.3rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .1rem .3rem #00000020 inset',
};
export default ChatContainer;