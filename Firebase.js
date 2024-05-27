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
  apiKey: "AIzaSyA6tyN_rEsXXpbyi-X-kdaaUMwte4geLxE",
  authDomain: "cu-attendance-test.firebaseapp.com",
  projectId: "cu-attendance-test",
  storageBucket: "cu-attendance-test.appspot.com",
  messagingSenderId: "646607290840",
  appId: "1:646607290840:web:cab8418e97da74854232ad",
  measurementId: "G-DZS2C1YJV1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
