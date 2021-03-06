import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";
import { useMediaQuery } from "./useMediaQuery";

interface Props {
    closeForm: () => void;
    joinChat: () => void;
};

function NewChatForm(props: Props) {
    const [privateChat, setPrivateChat] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [takenName, setTakenName] = useState(false);
    let mobileView = useMediaQuery('(max-width: 780px)');

    const {
        joinOpenRoom,
        joinLockedRoom,
        username,
        openRooms,
        lockedRooms
    } = useContext(SocketContext);

    function createNewChat(e: React.FormEvent) {
        e.preventDefault();
        const openRoomExist = openRooms.find((room) => room.roomName === roomName);
        const lockedRoomExist = lockedRooms.find((room) => room.roomName === roomName);

        if (openRoomExist?.roomName || lockedRoomExist?.roomName === roomName) {
            setTakenName(true);
        } else {
            if (password.length > 0) {
                joinLockedRoom(roomName, password, username);
                props.closeForm();
            } else {
                joinOpenRoom(roomName, username);
                props.closeForm();
            };
        };
    };

    return (
        <div style={{ width: '100%', padding: '0 1rem' }}>
            <div style={rootStyle}>
                <div style={titleContainer}>
                    <h2>Create New Chat</h2>
                </div>
                <form
                    style={mobileView ? mobileFormStyle : formStyle}
                    onSubmit={(e) => { createNewChat(e); props.joinChat() }}
                >
                    {takenName
                        ?
                        <p style={{ textAlign: 'center', color: '#E86666' }}>
                            Chat name already exist
                        </p>
                        :
                        <p>Chat name</p>
                    }
                    <input
                        type='text'
                        style={inputStyle}
                        onChange={(e) => setRoomName(e.target.value)}
                        onClick={() => setTakenName(false)}
                        required
                    />
                    <p style={{ marginBottom: '.3rem' }}>
                        Private chat
                    </p>
                    <div>
                        <input
                            onClick={() => setPrivateChat(true)}
                            type="radio"
                            id='yes'
                            name='private'
                        />
                        <label htmlFor='yes'>
                            Yes
                        </label>
                    </div>
                    <div>
                        <input
                            onClick={() => setPrivateChat(false)}
                            type="radio"
                            id='no'
                            name='private'
                        />
                        <label htmlFor='no'>
                            No
                        </label>
                    </div>

                    {privateChat && (
                        <div style={passwordContainer}>
                            <label htmlFor='password'>
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                id='password'
                                type='text'
                                style={inputStyle}
                                required
                            />
                        </div>
                    )}
                    <button
                        style={formButtonStyle}
                        type='submit'
                    >
                        Create Chat
                    </button>
                </form>
                <button
                    onClick={props.closeForm}
                    style={cancelButtonStyle}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
};

const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '50rem',
    margin: '0 auto',
};

const titleContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem 0 1.5rem',
    color: '#5C5C5C',
};

const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60%',
    margin: '5rem auto 0',
};

const mobileFormStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60%',
    margin: '0 auto',
};

const inputStyle: CSSProperties = {
    width: '100%',
    borderRadius: '.5rem',
    padding: '.5rem',
    marginTop: '.3rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .05rem .2rem #00000040 inset',
};

const passwordContainer: CSSProperties = {
    marginTop: '1rem',
};

const formButtonStyle: CSSProperties = {
    width: '100%',
    maxWidth: '10rem',
    borderRadius: '.3rem',
    padding: '.3rem',
    margin: '1rem auto',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .1rem .3rem #00000020 inset',
    backgroundColor: '#00ADEF',
    color: 'white',
    cursor: 'pointer',
};

const cancelButtonStyle: CSSProperties = {
    borderRadius: '.3rem',
    padding: '.3rem',
    margin: '0 auto',
    border: 'none',
    outline: 'none',
    backgroundColor: 'white',
    color: '#5C5C5C',
    cursor: 'pointer',
};

export default NewChatForm;
