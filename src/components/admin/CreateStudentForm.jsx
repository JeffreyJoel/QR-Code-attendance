import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase"; // Import 'auth' and 'db' from Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateStudentForm = (onSubmit) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullname] = useState("");
  const [matNumber, setMatNumber] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        import.meta.env.VITE_STUDENT_PASSWORD
      );
      const user = userCredential.user;

      await setDoc(doc(db, "students", user.uid), {
        fullname: fullName,
        email: email,
        matNumber: matNumber,
        level: level,
        department: department,
        isSuperAdmin: false
      }).then(() => {
        validateUser(user.uid);
      });

      console.log("New User Account created");
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const validateUser = async (id) => {
    try {
      const docRef = doc(db, "admins", id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        // Redirect to dashboard if user exists
        // navigate(`/Dashboard?name=${id}`);
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error("Validation error:", err.message);
    }
  };
  // console.log(response);

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Create Token</DialogTitle>
        <DialogDescription>
          {/* Make changes to your profile here. Click save when you are done. */}
          Parameters the contract specifies to be passed in during deployment.
        </DialogDescription>
      </DialogHeader>
      <div className=" py-4">
        <div className="mb-5 items-center gap-4">
          <Label htmlFor="name" className=" text-right">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            className="mt-2"
          />
        </div>
        <div className="mb-5 items-center gap-4">
          <Label htmlFor="symbol" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            onChange={(e) => {
                setEmail(e.target.value);
              }}
            className="mt-2"
          />
        </div>
        <div className="mb-5 items-center gap-4">
          <Label htmlFor="symbol" className="text-right">
            MatNumber
          </Label>
          <Input
            id="description"
            name="description"
             onChange={(e) => {
                setMatNumber(e.target.value)
              }}
            className="mt-2"
          />
        </div>

        <div className="mb-5 items-center gap-4">
          <Label htmlFor="symbol" className="text-right">
            Department
          </Label>
          <Input
            id="supply"
            name="supply"
            onChange={(e) => {
                setDepartment(e.target.value)
              }}
            className="mt-2"
          />
        </div>

        <div className="mb-5 items-center gap-4">
          <Label htmlFor="symbol" className="text-right">
            Level
          </Label>
          <Input
            id="decimal"
            name="decimal"
            // value={inputValues.decimal}
            onChange={(e) => {
                setLevel(e.target.value)
              }}
            className="mt-2"
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          type="submit"
          onClick={() => {
            handleSignUp();
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Deploy"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateStudentForm;
