import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { db } from "../../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSingleStudentData } from "@/hooks/useSingleStudentData";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const EditStudentForm = ({ onSubmit, id }) => {
  const { studentDetails } = useSingleStudentData(id);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullname] = useState("");
  const [matNumber, setMatNumber] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (studentDetails) {
      setFullname(studentDetails.fullname);
      setMatNumber(studentDetails.matNumber);
      setLevel(studentDetails.level);
      setDepartment(studentDetails.department);
      setEmail(studentDetails.email);
    }
  }, [studentDetails]); 

  EditStudentForm.propTypes = {
    onSubmit: PropTypes.func,
    id: PropTypes.string,
  };
//   console.log(id);

  const handleSignUp = async () => {
    // e.preventDefault();

    try {
      setLoading(true);
      await updateDoc(doc(db, "students", id.id), {
        fullname: fullName,
        email: email,
        matNumber: matNumber,
        level: level,
        department: department,
        isSuperAdmin: false,
      }).then(() => {});
      setLoading(false);
      console.log("New User Account created");
      onSubmit();
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogDescription></DialogDescription>
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
            defaultValue={studentDetails?.fullname}
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
            defaultValue={studentDetails?.email}
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
              setMatNumber(e.target.value);
            }}
            className="mt-2"
            defaultValue={studentDetails?.matNumber}
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
              setDepartment(e.target.value);
            }}
            className="mt-2"
            defaultValue={studentDetails?.department}
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
              setLevel(e.target.value);
            }}
            className="mt-2"
            defaultValue={studentDetails?.level}
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
          {loading ? "Loading..." : "Update"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditStudentForm;
