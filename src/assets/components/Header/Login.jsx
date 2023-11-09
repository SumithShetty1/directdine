import React from 'react';
import { auth, provider, signInWithPopup } from "../../../firebaseConfig"
import profile from "../../images/profile.png"

function Login() {
    const signInWithGoogle = () => {
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
            {/* <button className="login-btn" onClick={signInWithGoogle}>Login</button> */}
            {/* <div className='profile-dropdown'>
                <input type='checkbox' id="login-profile" />
                <label htmlFor='login-profile' className='login-label'>
                    <div>
                        <img src={profile} alt="" className='login-profile' />
                    </div>
                </label>
                <div className='dropDownProfile'>
                    <ul>
                        <li>Booking</li>
                        <li>Contact</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div> */}
            <ul>
                <li>
                    <img src={profile} className="profile" alt="Profile" />
                    <ul>
                        <li className="profile-name">
                            <p>Sumith</p>
                        </li>
                        <li className="sub-item">
                            <p>Bookings</p>
                        </li>
                        <li className="sub-item">
                            <p>Reservations</p>
                        </li>
                        <li className="sub-item">
                            <p>Logout</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default Login;
