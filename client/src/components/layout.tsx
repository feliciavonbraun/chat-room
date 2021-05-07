import { useState } from "react";
import SignIn from "./SignIn";
import Main from "./main";

function Layout() {
    const [signedIn, setSignedIn] = useState(false);
    
    function toggleSignIn() {
        setSignedIn(!signedIn);
    };

    return (
        <>
            {signedIn 
            ?<Main signOut = {toggleSignIn} />
            :<SignIn signIn = {toggleSignIn}/>
            } 
        </>
    );
};
export default Layout;