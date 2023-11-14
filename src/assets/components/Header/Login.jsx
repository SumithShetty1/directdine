import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Login() {
    const { googleSignIn, user, logOut } = UserAuth();
    const [restaurantEmail, setRestaurantEmail] = useState('');
    const userEmail = user ? user.email : '';

    useEffect(() => {
        const fetchRestaurantEmail = async () => {
            const db = getFirestore();
            const colRef = collection(db, 'Restaurants Details');

            try {
                const snapshot = await getDocs(colRef);
                snapshot.forEach((doc) => {
                    const data = doc.data();

                    const fetchedEmail = data.Email_Address;

                    if (userEmail === fetchedEmail) {
                        setRestaurantEmail(fetchedEmail);
                        return;
                    }
                });
            } catch (error) {
                console.error('Error fetching restaurant email:', error);
            }
        };

        fetchRestaurantEmail();
    }, [userEmail]);


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
                            {userEmail === restaurantEmail ? (
                                // Show Reservations link if the emails match
                                <Link to="/reservations">
                                    <li className="sub-item">
                                        <span className="material-icons-outlined"> grid_view </span>
                                        <p>Reservations</p>
                                    </li>
                                </Link>
                            ) : (
                                // Show My Bookings link if the emails don't match
                                <Link to="/mybookings">
                                    <li className="sub-item">
                                        <span className="material-icons-outlined"> grid_view </span>
                                        <p>My Bookings</p>
                                    </li>
                                </Link>
                            )}
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
