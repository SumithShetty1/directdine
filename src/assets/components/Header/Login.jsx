import React from 'react';
import { Link } from 'react-router-dom';
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
            <ul>
                <li>
                    <img src={profile} className="profile" alt="Profile" />
                    <ul>
                        <li className="profile-name">
                            <p>Sumith</p>
                        </li>
                        <li className="sub-item">
                            <Link to="/mybookings">
                                <p>
                                    My Bookings
                                </p>
                            </Link>
                        </li>
                        <li className="sub-item">
                            <Link to="/reservations">
                                <p>Reservations</p>
                            </Link>
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
