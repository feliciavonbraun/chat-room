import { CSSProperties, useState } from "react";

function ChatContainer() {
    const [message, setMessage] = useState('')

    // TODO: Spara meddelanden och mappa ut i 'messageContainer'

    function handleMessage(e: React.FormEvent) {
        e.preventDefault();
        console.log(`send: ${message}`);
        
        // Avsluta funktion med:
        setMessage('');
    }

    return (
        <div style={rootStyle}>
            <div style={titleContainer}>
                <h3>RoomName</h3>
            </div>
            <div style={messageContainer}>


            </div>
            <form 
                onSubmit={(e) => handleMessage(e)} 
                style={formContainer}
            >
                <input 
                    placeholder='Message...' 
                    style={inputStyle}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button 
                    type='submit' 
                    style={buttonStyle}
                >
                    Send
                </button>
            </form>
        </div>
    )
}

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
}




export default ChatContainer;