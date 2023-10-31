import React from 'react';
import {auth,provider,signInWithPopup} from "../../../firebaseConfig"
import profile from "../../images/profile.png"

function Login() {
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider)

        .then((result) => {
          // Handle the user authentication result here.
          const user = result.user;
          console.log('Successfully signed in:', user);
        //   <img src={profile} alt="" className='login-profile' />
        })
        .catch((error) => {
          // Handle errors, if any.
          console.error('Error during sign-in:', error);
        });
    }

    return (
        <>
        <button className="login-btn" onClick={signInWithGoogle}>Login</button>
        <input type='checkbox' id="login-profile" className='login-check'/>
        <label htmlFor='login-profile'>
            <img src={profile} alt="" className='login-profile' />
        </label>
        <ul>
            <li>Log Out</li>
        </ul>
        </>
    );
}

export default Login;
