import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";

function ChatContainer() {
    const { sendMessage, leaveRoom } = useContext(SocketContext);
    const [newMessage, setNewMessage] = useState('');
    const [ room ] = useState('Living room');
  
    // TODO: Spara meddelanden och mappa ut i 'messageContainer'

    function handleMessage(e: React.FormEvent) {
        e.preventDefault();

        sendMessage(newMessage)
        setNewMessage('');

        // let messageContent = {
        //     // room: room,
        //     content: {
        //         author: username,
        //         message: newMessage
        //     }
        // };

        console.log(`newMessage: ${newMessage}`);
    };

    return (
        <div style={rootStyle}>
            <div style={titleContainer}>
                {room}
            </div>
            <button 
                style={buttonStyle}
                onClick={() => leaveRoom()}
            >
                Leave room
            </button>
            <div style={messageContainer}>
                <p> säger: {sendMessage}</p>
                <p>Här ska alla meddelande in</p>
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
    backgroundColor: 'grey',
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