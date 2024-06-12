import { useState } from "react";
import { Button } from "@/components/ui/button";
import { auth, db } from "../../../Firebase"; // Import 'auth' and 'db' from Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useNavigate, useParams } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const CreateCourseForm = ({ onSubmit }) => {

  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${course}@gmail.com`,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "courses", user.uid), {
        Course: course,
        Email: `${course.toLowerCase()}@gmail.com`,
        isSuperAdmin: false,
        password: password
      }).then(() => {
        validateUser(user.uid);
      });

      console.log("New User Account created");
    } catch (error) {
      console.log(error);
    }
  };

  const validateUser = async (id) => {
    try {
      const docRef = doc(db, "courses", id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        // Redirect to dashboard if user exists
        // navigate(`/course-dashboard/${id}`);
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error("Validation error:", err.message);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Create Course</DialogTitle>
      </DialogHeader>
      <div className="mb-4">
        <div className="mb-4">
          <Label htmlFor="" className="">
            Course Id
          </Label>
          <Input
            className="mt-2"
            placeholder="Enter course code"
            type="text"
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            className="mt-2"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="text-center mt-8">
          <Button className="w-1/2" onClick={handleSignUp}>
            Create
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default CreateCourseForm;
