import { useState } from "react";
import SignIn from "./SignIn";
import Main from "./main";

function Layout() {
    const [fakeInlog, setFakeInlog] = useState(false);
    
    function handleSignIn(username: string) {
        setFakeInlog(true);
        console.log(username)
    };

    return (
        <>
            {fakeInlog 
            ?<Main />
            :<SignIn logIn = {handleSignIn}/>
            } 
        </>
    )
};

export default Layout;