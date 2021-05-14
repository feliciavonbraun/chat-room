import { CSSProperties, useEffect, useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../contexts/socketProvider";
import chatLogo from "../assets/chatLogo.svg";
import { useMediaQuery } from "./useMediaQuery";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './MobileSidebar.css';

interface Props {
    signOut: () => void;
    openForm: (value: boolean) => void
    joinChat: (value: boolean) => void;
    clickedFormButton: boolean;
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
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    let mobileView = useMediaQuery('(max-width: 780px)');
  
   useEffect(() => {
        if (isCorrectPassword) {
            setShowPasswordInput(false);
            setShowErrorMessage(false);
        } else {
            setShowErrorMessage(true);
    }}, [isCorrectPassword]); 
          
    function openPasswordInput(roomName: string) {
        setClickedRoom(roomName);
        setShowPasswordInput(true);
    };

    function handleJoinLockedRoom() {
        joinLockedRoom(clickedRoom, inputPassword, username);
        setInputPassword('');
    };

    function handleSidebarStyle() {
        let style = '';

        if (mobileView) {
            style = 'mobileRootStyle'
            if(!isOpenSidebar) {
                style = 'mobileRootStyle closeStripeStyle'
                return style;
            }
            return style;
        } else {
            style = 'rootStyle'
            return style
        }
    };

    return (
        <aside
            className={handleSidebarStyle()}
        >
            {mobileView &&
                <div
                    style={stripeStyle}
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                >
                    {!isOpenSidebar 
                        ? <ArrowForwardIosIcon/>
                        : <ArrowBackIosIcon/>
                    }
                </div>
            }

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
                    onClick={() => {props.openForm(true); setShowPasswordInput(false)}}
                    style={props.clickedFormButton 
                            ?   { ...buttonStyle, ...newChatButtonStyle, ...activeButtonStyle }
                            :   { ...buttonStyle, ...newChatButtonStyle }
                        }
                >
                    New Chat
                </button>
                <h3 style={{ color: '#5C5C5C' }}>
                    Chat
                </h3>
                {openRooms.map((room, index) => (
                    <button
                        key={index}
                        style={room.roomName === activeChatRoom && !props.clickedFormButton
                            ? { ...buttonStyle, ...activeButtonStyle } 
                            : buttonStyle
                        }
                        onClick={() => {
                            joinOpenRoom(room.roomName, username); 
                            props.joinChat(false);
                            setShowPasswordInput(false);
                            props.openForm(false);
                        }}
                        disabled={room.roomName === activeChatRoom}
                    >
                        {room.roomName}
                    </button>
                ))}
            </div>
            <h3 style={{ color: '#5C5C5C', textAlign: 'center' }}>
                Private Chat
            </h3>
            <div style={roomButtonsContainer}>
                {lockedRooms.map((room, index) => (
                    <button
                        key={index}
                        style={room.roomName === activeChatRoom && !props.clickedFormButton
                            ? { ...buttonStyle, ...activeButtonStyle } 
                            : buttonStyle
                        }
                        onClick={() => {
                            openPasswordInput(room.roomName); 
                            props.joinChat(false);
                            props.openForm(false);
                        }}
                        disabled={room.roomName === activeChatRoom}
                        id={room.roomName}
                    >
                        {room.roomName}
                    </button>
                ))}
                {showPasswordInput && (
                    <div style={passwordInputContainer}>
                        {!showErrorMessage
                            ? 
                            <p>{`Chat Room: ${clickedRoom}`}</p>
                            :
                            <p style={{textAlign: 'center', color:'#E86666'}}>
                                Wrong password
                            </p>
                        }
                        <input
                            type='password'
                            style={inputStyle}
                            value={inputPassword}
                            placeholder='Enter password'
                            onChange={(e) => setInputPassword(e.target.value)}
                            onClick={() => setShowErrorMessage(false)}
                        />
                        
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

// Styling for mobile view: MobileSidebar.css

const stripeStyle: CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    height: '100vh',
    width: '2rem',
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(#00A8F4, #00F39A)',
    color: 'white',
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
    color: '#5C5C5C'
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
