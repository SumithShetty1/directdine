import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

function Login() {
    const { googleSignIn, user, logOut } = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSignOut = async () => {
        try {
            await logOut()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {user ?
                <ul>
                    <li>
                        <img src={user.photoURL} className="profile" alt="Profile" />
                        <ul>
                            <li className="profile-name">
                                <p>{user.displayName}</p>
                            </li>
                            <Link to="/mybookings">
                                <li className="sub-item">
                                    <span className="material-icons-outlined"> grid_view </span>
                                    <p>My Bookings</p>
                                </li>
                            </Link>
                            <Link to="/reservations">
                                <li className="sub-item">
                                    <span className="material-icons-outlined"> grid_view </span>
                                    <p>Reservations</p>
                                </li>
                            </Link>
                            <li className="sub-item" onClick={handleSignOut}>
                                <span className="material-icons-outlined"> logout </span>
                                <p>Logout</p>
                            </li>
                        </ul>
                    </li>
                </ul>
                :
                <button onClick={handleGoogleSignIn} className='login-btn'>Login</button>
            }
        </>
    );
}

export default Login;
