import { useState, useEffect } from 'react';
import {  doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase.js';

export const useSingleStudentData = (studentId) => {
    const [studentDetails, setStudentDetails] = useState();
  
    useEffect(() => {
      const fetchStudentDetails = async () => {
        const studentRef = doc(db, "students", studentId?.id);
        
        const unsubscribe = onSnapshot(studentRef, (docSnap) => {
          if (docSnap.exists()) {
            setStudentDetails(docSnap.data());
            // console.log("Student details fetched successfully:", docSnap.data());
          } else {
            console.log("No such student!");
          }
        }, (err) => {
          console.error("Error fetching student details:", err);
        });
  
        return () => unsubscribe();
      };
    //   console.log(studentId.id);
  
      fetchStudentDetails();
    }, [studentId])
    return { studentDetails };
}
