// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuUQ1ZUukJ46LzloWdHqRpKIZTVC85IVE",
  authDomain: "directdine-d4261.firebaseapp.com",
  projectId: "directdine-d4261",
  storageBucket: "directdine-d4261.appspot.com",
  messagingSenderId: "1003236394722",
  appId: "1:1003236394722:web:5d3743bc4176a8222b00bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);