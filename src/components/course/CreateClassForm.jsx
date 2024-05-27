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

const CreateClassForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState("");
  const {students} = useStudents();
  const { id } = useParams();

  const handleSignUp = async () => {
    try {
        const docRef = await addDoc(
        collection(db, "courses", id, "classes"),
        {
          week: 1,
          students: students,
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
