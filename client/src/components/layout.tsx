import { useState, useContext } from "react";
import SignIn from "./SignIn";
import Main from "./main";
import { SocketContext } from "../contexts/socketProvider";

function Layout() {
    const { connect } = useContext(SocketContext)
    const [fakeInlog, setFakeInlog] = useState(false);
    
    function handleSignIn(username: string) {
        setFakeInlog(true);
        connect(username)
        console.log(username)
    };

    return (
        <>
            {fakeInlog 
            ?<Main />
            :<SignIn logIn = {handleSignIn}/>
            } 
        </>
    );
};
export default Layout;