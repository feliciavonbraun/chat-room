import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";

function ChatContainer() {
    const { sendMessage, allMessages, leaveRoom, username, activeChatRoom } = useContext(SocketContext);
    const [text, setText] = useState('');
    const [userLeftRoom, setUserLeftRoom] = useState(false);
    const you = username; // detta är det satta usernamet

    function handleMessage(e: React.FormEvent) {
        e.preventDefault();
        sendMessage(username, text, activeChatRoom)
        setText('');
        ScrollToNewMessage();
    };

    // TODO: Scrollar inte hela vägen ner. Missar senaste meddelandet.
    function ScrollToNewMessage() {
        const scrollContainer = document.getElementById('scrollContainer');
        scrollContainer?.scrollTo(0, scrollContainer.scrollHeight)
    };

    function handleLeaveRoom() {
        setUserLeftRoom(true);

    }

    const roomMessages = allMessages.filter((message) => message.roomName === activeChatRoom);

    return (
        <div style={{ width: '100%', padding: '0 1rem', }}>
            <div style={rootStyle}>
                {userLeftRoom

                    ? <div>Här ska typ livingroom komma in igen eller nå</div>

                    : <div>
                        <div style={topChatStyle}>
                            {activeChatRoom !== 'Living room' && (
                                <button
                                    style={{ ...buttonStyle, ...leaveButtonStyle }}
                                    onClick={() => { leaveRoom(); handleLeaveRoom() }}
                                >
                                    Leave room
                                </button>
                            )}
                            <h2 style={roomNameStyle}>
                                {activeChatRoom}
                            </h2>
                        </div>
                        <div style={chatContainer} id='scrollContainer'>
                            {roomMessages.map(({ username, text }, index) => (
                                <div key={index} style={messageContainer} >
                                    <div style={username === you ? { ...messageStyle, ...yourMessages } : { ...messageStyle, ...othersMessages }} >
                                        {text}
                                    </div>
                                    {username === you ?
                                        <p style={yourName}>You</p>
                                        :
                                        <p style={othersNames}>{username}</p>
                                    }
                                </div>
                            ))
                            }
                        </div>
                        <form
                            onSubmit={(e) => handleMessage(e)}
                            style={formContainer}
                        >
                            <input
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
                }
            </div>
        </div>
    );
};

const rootStyle: CSSProperties = {
    width: '100%',
    maxWidth: '50rem',
    margin: '0 auto',
};

const topChatStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: '2.5rem 0 1.5rem',
};

const roomNameStyle: CSSProperties = {
    textAlign: 'center',
    margin: '0 auto',
    color: '#5C5C5C',
};

const chatContainer: CSSProperties = {
    padding: '.5rem',
    boxShadow: '.1rem .05rem .2rem #00000020 inset',
    borderRadius: '.3rem',
    height: '60vh',
    overflowY: 'scroll',
};

const messageContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
};

const messageStyle: CSSProperties = {
    fontSize: '0.8rem',
    padding: '.3rem .5rem',
    margin: '.4rem 0 0',
    borderRadius: '.3rem',
    boxShadow: '.1rem .05rem .2rem #00000040',
};

const yourMessages: CSSProperties = {
    alignSelf: 'flex-end',
    backgroundColor: '#00A6F6',
    color: 'white',
};

const othersMessages: CSSProperties = {
    alignSelf: 'flex-start',
    background: '#EEEEEE',
};

const yourName: CSSProperties = {
    alignSelf: 'flex-end',
    margin: '0 .3rem .5rem 0',
    color: '#5C5C5C',
    fontSize: '0.7rem',
};

const othersNames: CSSProperties = {
    alignSelf: 'flex-start',
    margin: '0 0 .5rem .3rem',
    color: '#5C5C5C',
    fontSize: '0.7rem',
};

const formContainer: CSSProperties = {
    height: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0',
};

const inputStyle: CSSProperties = {
    width: '75%',
    borderRadius: '.3rem',
    padding: '.5rem',
    marginRight: '.3rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .05rem .2rem #00000040 inset',
};

const buttonStyle: CSSProperties = {
    width: '20%',
    minWidth: '5.5rem',
    maxWidth: '10rem',
    borderRadius: '.3rem',
    padding: '.3rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .1rem .3rem #00000020 inset',
    backgroundColor: '#09DCBB',
    color: 'white',
    cursor: 'pointer',
};

const leaveButtonStyle: CSSProperties = {
    position: 'absolute',
    backgroundColor: 'white',
    color: '#5C5C5C',
};

export default ChatContainer;