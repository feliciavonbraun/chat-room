import { CSSProperties, useContext, useState } from "react";
import { SocketContext } from "../contexts/socketProvider";

interface Props {
    closeForm: () => void;
};

function NewChatForm(props: Props) {
    const [privateChat, setPrivateChat] = useState(false)
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('')

    const { joinRoom } = useContext(SocketContext);

    function createNewChat(e: React.FormEvent) {
        e.preventDefault();
        if (password.length > 0){
            joinRoom(roomName, password);
        } else {
            joinRoom(roomName);
        };
    };

    return (
        <div style={rootStyle}>
            <div style={titleContainer}>
                Create New Chat
            </div>
            <form 
                style={formStyle} 
                onSubmit={(e) => { createNewChat(e); props.closeForm() }}
            >
                <label htmlFor='chat-name'>
                    Chat name
                </label>
                <input 
                    id='chat-name' 
                    type='text' 
                    style={inputStyle} 
                    onChange={(e) => setRoomName(e.target.value)} 
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
    )
};

const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
};

const titleContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
};

const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60%',
    margin: '5rem auto 0',
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
