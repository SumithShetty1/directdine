import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase";

// Creating a context to manage authentication state
const AuthContext = createContext();

// AuthContextProvider component to manage authentication state
export const AuthContextProvider = ({ children }) => {
    // State to store user information
    const [user, setUser] = useState({});
    const isAndroid = /Android/i.test(navigator.userAgent);

    // Function to sign in using Google
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider); // Sign in with a popup
        if (isAndroid) {
            signInWithRedirect(auth, provider); // If on Android, sign in with redirect
        }
    }

    // Function to log out
    const logOut = () => {
        signOut(auth); // Sign out the user
    }

    // Effect to listen for changes in authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update the user state with the current user
        })
        return () => {
            unsubscribe(); // Unsubscribe from auth state changes when the component unmounts
        }
    }, [])

    // Providing the authentication context value to its children
    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use the AuthContext
export const UserAuth = () => {
    return useContext(AuthContext); // Accessing authentication context in components
}
