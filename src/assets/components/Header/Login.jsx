import React from 'react';
import{signInWithGoogle} from "./firebaseConfig"

function Login() {
    

    return (
        <button className="login-btn" onClick={signInWithGoogle}>Login</button>
    );
}

export default Login;
