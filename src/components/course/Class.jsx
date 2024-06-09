import { useState, useEffect } from "react";
import CreateClass from "./CreateClass";
import QRCode from "react-qr-code";
import { useCourses } from "@/context/CourseContext";
import { useParams } from "react-router-dom";
import useClassData from "@/hooks/useClassData";

function Class() {
  const [classId, setClassId] = useState('');
  const [classDuration, setClassDuration] = useState('');
  const { id } = useParams();
  const { courses } = useCourses();
  const foundCourse = courses.find((course) => course?.id === id);
  const { classData } = useClassData(foundCourse?.id);

  useEffect(() => {
    const storedClassId = localStorage.getItem('classId');
    if (storedClassId!== null) {
      setClassId(storedClassId);
    }
  }, []);

  function handleCreateClass(newId, newDuration) {
    console.log(`Class ID: ${newId}, Duration: ${newDuration}`);
    setClassDuration(newDuration);
    setClassId(newId);
    localStorage.setItem('classId', newId);
  }

  return (
    <div className="mt-12">
      <div className="p-4 px-0 w-full">
        <h2 className="text-4xl">{`Week: ${classData?.length + 1}`}</h2>
       <div className="mt-12">
       <CreateClass onSubmit={handleCreateClass} />

       </div>
      </div>

      {(classId && classDuration) && (
        <div className="p-4 px-0 w-full">
          <QRCode value={classId} className="mx-auto" />
          <div className="text-center mt-8">
            <p>{`Class ID: ${classId}`}</p>
            <p>{`Duration: ${classDuration} minutes`}</p>
            <p>{`Week: ${classData?.length}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Class;
