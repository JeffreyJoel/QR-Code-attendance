/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Firebase.js';
// import { useAuth } from './AuthContext';

const StudentsContext = createContext();

export function useStudents() {
  return useContext(StudentsContext);
}

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "students")),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id,...doc.data() });
        });
        setStudents(list);
        console.log('successful');
      },
      (err) => {
        console.error('Error fetching students:', err);
      }
    );
  
    return () => {
      unsub();
    };
  }, [])

  // console.log(students);

  const value = {
    students
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}