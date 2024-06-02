/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Firebase.js';
// import { useAuth } from './AuthContext';

const CoursesContext = createContext();

export function useCourses() {
  return useContext(CoursesContext);
}

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "courses")),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id,...doc.data() });
        });
        setCourses(list);
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

  // console.log(courses);

  const value = {
    courses
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}