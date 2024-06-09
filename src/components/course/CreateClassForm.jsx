import { useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "../../../Firebase"; // Import 'auth' and 'db' from Firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStudents } from "@/context/StudentContext";
import { useParams } from "react-router-dom";
import { useCourses } from "@/context/CourseContext";
import useClassData from "@/hooks/useClassData";

const CreateClassForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState("");
  const {students} = useStudents();
  const { id } = useParams();
  const { courses } = useCourses();
  const foundCourse = courses.find((course) => course?.id === id);
  const { classData } = useClassData(foundCourse?.id);

  const handleSignUp = async () => {
    try {
      const studentEntries = students.map(student => ({
        ...student,
        attended: false,
      }));
        const docRef = await addDoc(
        collection(db, "courses", id, "classes"),
        {
          week: classData?.length,
          students: studentEntries,
          Date: serverTimestamp(),
        }
      );

      console.log("New User Account created");
    
      onSubmit(docRef.id, duration);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Create Class</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <div className="mb-5 items-center gap-4">
          <Label htmlFor="duration" className="text-right">
            Duration in minutes
          </Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            className="mt-2"
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          onClick={() => {
            handleSignUp();
          }}
          disabled={loading}
        >
          {loading? "Loading..." : "Create"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateClassForm;
