import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";
import Lottie from 'react-lottie';
import animationData from '../assets/waiting.json';

interface Props {
    leaveChat: boolean;
    setLeaveChat: () => void;
}

function ChatContainer(props: Props) {
    const {
        sendMessage,
        allMessages,
        leaveRoom,
        username,
        activeChatRoom,
    } = useContext(SocketContext);

    const [text, setText] = useState('');
    const you = username;
    const roomMessages = allMessages.filter((message) => message.roomName === activeChatRoom);


    function handleMessage(e: React.FormEvent) {
        e.preventDefault();
        sendMessage(username, text, activeChatRoom)
        setText('');
        ScrollToNewMessage();
    };

    //TODO: Scrollar inte hela vägen ner. Missar senaste meddelandet.
    function ScrollToNewMessage() {
        const scrollContainer = document.getElementById('scrollContainer');
        scrollContainer?.scrollTo(0, scrollContainer.scrollHeight)
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }



    return (
        <div style={{ width: '100%', padding: '0 1rem', }}>
            <div style={rootStyle}>
                {props.leaveChat
                    ?
                    <div style={middlePage}>
                        <p>
                            Hey {username}!<br></br>
                            You are currently not in a room,<br></br>
                             choose one to keep chatting!<br></br>
                            /Fred
                        </p>
                        <div style={lottieBox}>
                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={200}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <div style={topChatStyle}>
                            {activeChatRoom !== 'Living room' && (
                                <button
                                    style={{ ...buttonStyle, ...leaveButtonStyle }}
                                    onClick={() =>  {leaveRoom(); props.setLeaveChat()}}
                                >
                                    Leave room
                                </button>
                            )}
                            <h2 style={roomNameStyle}>
                                {activeChatRoom}
                            </h2>
                        </div>
                        <div style={chatContainer} id='scrollContainer'>
                            {roomMessages.map(({ username, text, eventNotification }, index) => (
                                <div key={index}>
                                    {eventNotification
                                        ?
                                        <p style={notificationMessageStyle}>
                                            {eventNotification}
                                        </p>
                                        :
                                        <div style={messageContainer}>
                                            <div style={username === you ? { ...messageStyle, ...yourMessages } : { ...messageStyle, ...othersMessages }} >
                                                {text}
                                            </div>
                                            <p style={username === you
                                                ? yourName
                                                : othersNames}
                                            >
                                                {username === you ? 'You' : username}
                                            </p>
                                        </div>
                                    }
                                </div>
                            ))}
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

const middlePage: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    alignContent: 'center',
    textAlign: 'center',
    lineHeight: '1.3rem'

}

const lottieBox: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
}

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

const notificationMessageStyle: CSSProperties = {
    textAlign: 'center',
    color: '#5C5C5C',
    fontSize: '.8rem',
}

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