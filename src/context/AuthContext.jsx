import React, { useContext, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [Uid, setUid] = useState([]);

  const signUp = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    Uid.push(res.user.uid);
    console.log(Uid);
    localStorage.setItem("userID", res.user.uid);
  };
  async function logIn(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("userID", res.user.uid);
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      localStorage.setItem("userID", currentUser?.uid);
      // setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  // useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         if (currentUser) {
  //           const docRef = doc(db, "admins", currentUser.uid);
  //           localStorage.setItem('userID', currentUser.uid)
  //           const docSnap = await getDoc(docRef);

  //           if (docSnap.exists()) {
  //             setUserData(docSnap.data());
  //           } else {
  //             console.log("No such document!");
  //           }
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  //    currentUser && getData();
  //   }, [currentUser]);

  //   console.log(userData);
  //   const userID = localStorage.getItem("userID")

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    Uid,
    userData,
    // userID
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
