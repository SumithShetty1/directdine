// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLfRzdJCESFNcl_XcIPl6Zu8gf_bdHrvI",
  authDomain: "directdine-c3744.firebaseapp.com",
  databaseURL: "https://directdine-c3744-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "directdine-c3744",
  storageBucket: "directdine-c3744.appspot.com",
  messagingSenderId: "541783449057",
  appId: "1:541783449057:web:21dbded23ce7525a1c06a0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()


export {app, auth, provider, signInWithPopup};