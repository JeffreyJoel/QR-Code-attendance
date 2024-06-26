import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase.js'; // Adjust the import path according to your project structure

const useClassData = (courseId) => {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classRef = query(collection(db, "courses", courseId, "classes"), orderBy("Date"))
  
      const unsubscribe = onSnapshot(classRef, (querySnapshot) => {
        let classList = [];
        querySnapshot.forEach((doc) => {
          classList.push({ id: doc.id,...doc.data() }); // Push each class document into the array
        });
        setClassData(classList); // Update the state with the ordered list of classes
        console.log('Classes fetched successfully');
      }, (err) => {
        console.error('Error fetching classes:', err);
      });

      return () => unsubscribe();
    };

    fetchClasses();
  }, [courseId]); // Depend on the course state to refetch classes whenever the course changes

  return { classData };
};

export default useClassData;
