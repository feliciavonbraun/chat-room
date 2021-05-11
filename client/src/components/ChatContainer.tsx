import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";

function ChatContainer() {
    const { sendMessage, allMessages, leaveRoom, username, activeChatRoom } = useContext(SocketContext);
    const [text, setText] = useState('');
    const you = username; // detta är det satta usernamet

    function handleMessage(e: React.FormEvent) {
        e.preventDefault();
        sendMessage(username, text, activeChatRoom)
        setText('');
        console.log(`${username} says '${text}' in: ${activeChatRoom}`);
    };

    const roomMessages = allMessages.filter((message) => message.roomName === activeChatRoom);

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
                {roomMessages.map(({ username, text }, index) => {
                    return (
                        <div key={index} style={username === you ? yourMessages : othersMessages} >
                            {username === you ?
                                <p> You: {text} </p>
                                :
                                <p> {username}: {text} </p>
                            }
                        </div>
                    )
                })}
            </div>
            <form
                onSubmit={(e) => handleMessage(e)}
                style={formContainer}
            >
                <textarea
                    placeholder='Message...'
                    style={inputStyle}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
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
    backgroundColor: 'rgb(0, 219, 184)',
    margin: '0 .5rem',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    //detta borde räcka för scroll??!!
    // flexGrow: 1,
    height: '25rem',
    // overflow: 'auto',
    overflowY: 'scroll',

};

const othersMessages: CSSProperties = {
    background: 'white',
    borderRadius: '.5rem',
    margin: '.3rem',
    fontSize: '0.7rem',
    maxWidth: '70%',
    padding: '0 .5rem',
    alignSelf: 'flex-start',
};

const yourMessages: CSSProperties = {
    background: 'lightblue',
    borderRadius: '.3rem',
    margin: '.5rem',
    fontSize: '0.7rem',
    padding: '0 .5rem',
    maxWidth: '70%',
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
    background: 'rgb(0, 173, 239)',
};
export default ChatContainer;