import { CSSProperties, useEffect, useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../contexts/socketProvider";
import chatLogo from "../assets/chatLogo.svg"

interface Props {
    signOut: () => void;
    openForm: () => void
};

function Sidebar(props: Props) {
    const {
        username,
        openRooms,
        lockedRooms,
        activeChatRoom,
        leaveRoom,
        isCorrectPassword,
        joinOpenRoom,
        joinLockedRoom,
    } = useContext(SocketContext);

    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [clickedRoom, setClickedRoom] = useState('');
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    // Ej klar
    useEffect(() => {
        setWindowSize(window.innerWidth)
    }, [])

    function openPasswordInput(roomName: string) {
        setClickedRoom(roomName)
        setShowPasswordInput(true)
    };

    function handleJoinLockedRoom() {
        joinLockedRoom(clickedRoom, inputPassword, username);   
        setInputPassword('')
    };

    useEffect(() => {
        if (isCorrectPassword) {
            setShowPasswordInput(false)
        }
    }, [isCorrectPassword])
    

    return (
        <aside style={windowSize > 655 ? rootStyle : {...rootStyle, ...rootStyleMobile}}>
            <div style={welcomeContainer}>
                <img 
                    src={chatLogo} 
                    style={logoStyle}
                    alt="ChatALot" 
                />
                <h3 style={usernameStyle}>{username}</h3>
                <button
                    style={{ ...buttonStyle, ...noBorderButtonStyle }}
                    onClick={() => { leaveRoom(); props.signOut() }}
                >
                    Sign out
                </button>
            </div>
            <div style={roomButtonsContainer}>
                <button
                    onClick={props.openForm}
                    style={{ ...buttonStyle, ...newChatButtonStyle }}
                >
                    New Chat
                </button>
                <h3 style={{ color: '#5C5C5C' }}>
                    Chat
                </h3>
                {openRooms.map((room, index) => (
                    <button
                        key={index}
                        style={room.roomName === activeChatRoom 
                            ? { ...buttonStyle, ...activeButtonStyle } 
                            : buttonStyle
                        }
                        onClick={() => joinOpenRoom(room.roomName, username)}
                    >
                        {room.roomName}
                    </button>
                ))}
            </div>
            <h3 style={{ color: '#5C5C5C' }}>
                Private Chat
            </h3>
            <div style={roomButtonsContainer}>
                {lockedRooms.map((room, index) => (
                    <button
                        key={index}
                        style={room.roomName === activeChatRoom 
                            ? { ...buttonStyle, ...activeButtonStyle } 
                            : buttonStyle
                        }
                        onClick={() => openPasswordInput(room.roomName)}
                        id={room.roomName}
                    >
                        {room.roomName}
                    </button>
                ))}
                {showPasswordInput && (
                    <div style={passwordInputContainer}>
                        <label>{`Chat Room: ${clickedRoom}`}</label>
                        <input
                            type='password'
                            style={inputStyle}
                            value={inputPassword}
                            placeholder='Enter password'
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                        {!isCorrectPassword && <span>Fel lösenord, försök igen</span>}
                        <button
                            style={{ ...buttonStyle, ...passwordButtonStyle }}
                            onClick={handleJoinLockedRoom}
                        >
                            Join
                        </button>
                        <button
                            style={{ ...buttonStyle, ...noBorderButtonStyle }}
                            onClick={() => setShowPasswordInput(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </aside>
    )
};

const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    minWidth: '15rem',
    height: '100vh',
    boxShadow: '-.1rem -.2rem .3rem #00000020 inset',
};

const rootStyleMobile: CSSProperties = {
    backgroundColor: 'pink',
};

const welcomeContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
};

const usernameStyle: CSSProperties = {
    marginTop: '-.9rem',
    color: '#5C5C5C'
};

const logoStyle: CSSProperties = {
    width: '100%',
    maxWidth: '15rem',
    padding: '2rem 0',
};

const roomButtonsContainer: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
};

const passwordInputContainer: CSSProperties = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    color: '#00ADEF',
    fontWeight: 'bold',
};

const inputStyle: CSSProperties = {
    width: '65%',
    borderRadius: '.5rem',
    padding: '.5rem',
    margin: '.5rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .05rem .2rem #00000040 inset',
};

const buttonStyle: CSSProperties = {
    width: '100%',
    maxWidth: '12rem',
    textAlign: 'center',
    padding: '.5rem 0',
    marginBottom: '.5rem',
    borderRadius: '.3rem',
    backgroundColor: 'white',
    boxShadow: '.1rem .1rem .3rem #00000020 inset',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
};

const noBorderButtonStyle: CSSProperties = {
    boxShadow: 'none',
    padding: '0',
    color: '#00ADEF',
};

const newChatButtonStyle: CSSProperties = {
    width: '80%',
    maxWidth: '10rem',
    marginTop: '3rem',
    boxShadow: '0 .1rem .4rem #00000020',
    backgroundColor: 'white',
    color: '#5C5C5C',
};

const passwordButtonStyle: CSSProperties = {
    width: '80%',
    maxWidth: '10rem',
    margin: '.5rem 0 .7rem',
    boxShadow: '.1rem .1rem .3rem #00000020',
    backgroundColor: '#00DBB8',
    color: 'white',
};

const activeButtonStyle: CSSProperties = {
    backgroundColor: '#00ADEF',
    color: 'white',
};


export default Sidebar;
