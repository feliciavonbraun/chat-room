import { CSSProperties, useContext, useState } from "react"
import { SocketContext } from "../contexts/socketProvider"

interface Props {
    signIn: () => void
};

function SignIn(props: Props) {
    const [username, setUsername] = useState('')
    const { saveUsername, joinRoom } = useContext(SocketContext);

    function handleSignIn(e:React.FormEvent) {
        e.preventDefault()
        setUsername(username)
        saveUsername(username)
        joinRoom('Living room')
        props.signIn()
    }

    return (
        <main style={rootStyle}>
            <div style={signInContainer}>
                <h1>ChatALot</h1>
                <form onSubmit={(e) => handleSignIn(e)} style={formStyle}>
                    <input 
                        type='text' 
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                        maxLength={15}
                        style={inputStyle}
                    />
                    <button 
                        type='submit' 
                        style={username.length < 3 
                                ? {...buttonStyle, ...disabled} 
                                : {...buttonStyle, ...active}} 
                        disabled={username.length < 3}
                        >
                        Let's Go
                    </button>
                </form>
            </div>
        </main>
    )
}

const rootStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundImage: 'linear-gradient(to top right, #00FA94, #00A4FA)'
};

const signInContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    maxWidth: '25rem',
    height: '15rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '.1rem .1rem .2rem #00000050 inset',
};

const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '60%',
    width: '75%',
};

const inputStyle: CSSProperties = {
    width: '100%',
    textAlign: 'center',
    borderRadius: '.5rem',
    padding: '.5rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .05rem .2rem #00000040 inset',
};

const buttonStyle: CSSProperties = {
    width: '50%',
    borderRadius: '.3rem',
    padding: '.3rem',
    border: 'none',
    outline: 'none',
    boxShadow: '.1rem .1rem .3rem #00000020 inset',
};

const active: CSSProperties = {
    backgroundColor: '#00DBB8',
    color: 'white',
    width: '60%',
    transition: '.3s ease-in-out'
};

const disabled: CSSProperties = {
    backgroundColor: '#D8D8D8',
    transition: '.4s ease-out'
};

export default SignIn;