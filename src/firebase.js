// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);