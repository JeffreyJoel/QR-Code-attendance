// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzOAz_R6DjazwooJtC8QwK7B4ZbnMarH4",
  authDomain: "cu-attendance-9102a.firebaseapp.com",
  projectId: "cu-attendance-9102a",
  storageBucket: "cu-attendance-9102a.appspot.com",
  messagingSenderId: "1060113121300",
  appId: "1:1060113121300:web:c22b6cf5d2b7dd72dbe701",
  measurementId: "G-N9RBD20YBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
