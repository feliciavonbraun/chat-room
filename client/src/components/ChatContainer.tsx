import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";

function ChatContainer() {
    const { sendMessage, allMessages, leaveRoom, username } = useContext(SocketContext);
    const [newMessage, setNewMessage] = useState('');
    const [room] = useState('Living room');
    const you = username; // detta är det satta usernamet

    function handleMessage(e: React.FormEvent) {
        e.preventDefault();

        sendMessage(newMessage)
        setNewMessage('');
        window.scrollTo(0, document.body.scrollHeight);

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
            <div style={username === you ? messageContainer : otherContainer}> 
                {allMessages.map(({ username, text }, index) => {
                    return (
                        <div key={index} style={messageBox} >
                            {username === you ?
                                <p style={{ display: 'flex', justifyContent: 'flex-end'}}>You: {text}</p>
                                :
                                <p style={{color: 'green'}}>{username}: {text}</p>
                            }
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

};

const titleContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
};

const messageContainer: CSSProperties = {
    margin: '0 1rem',
    backgroundColor: 'pink',

    //detta borde räcka för scroll??!!
    height: '20rem',
    overflow: 'auto',
    // overflow: 'scroll',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
};

const otherContainer: CSSProperties = {

    // denna nås aldrig pga usernamet
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
}

const messageBox: CSSProperties = {
    background: 'white',
    borderRadius: '.5rem',
    margin: '.5rem',
    fontSize: '0.7rem',
    width: '15rem',
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