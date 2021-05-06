import { useState } from "react";
import SignIn from "./SignIn";
import Main from "./main";

function Layout() {
    const [fakeInlog, setFakeInlog] = useState(false);
    
    function handleSignIn() {
        setFakeInlog(true);
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