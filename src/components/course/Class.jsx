import { useState } from "react";
import CreateClass from "./CreateClass";
import QRCode from "react-qr-code";
import { useCourses } from "@/context/CourseContext";
import { useParams } from "react-router-dom";
import useClassData from "@/hooks/useClassData";

function Class() {
  const [classId, setClassId] = useState();
  const [classDuration, setClassDuration] = useState();
  const { id } = useParams();
  const { courses } = useCourses();
  const foundCourse = courses.find((course) => course?.id === id);
  const {classData} = useClassData(foundCourse?.id)

  function handleCreateClass(id, duration) {
    console.log(`Class ID: ${id}, Duration: ${duration}`);
    setClassDuration(duration);
    setClassId(id);
    console.log(courses);
  }
  console.log(`Class ID: ${classId}, Duration: ${classDuration}`);

  return (
    <div className="mt-32">
      <div className="p-4 px-0 w-full">
        <CreateClass onSubmit={handleCreateClass} />
      </div>

      {classId && (
        <div className="p-4 px-0 w-full">
          <QRCode value={classId} className="mx-auto" />
         <div className="text-center mt-8">
         <p>{`Class ID: ${classId} `}</p>
          <p>{`Duration: ${classDuration} minutes`}</p>
          <p>{`Week: ${classData?.length}`}</p>
         </div>
        </div>
      )}
    </div>
  );
}

export default Class;
