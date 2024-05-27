import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase"; // Import 'auth' and 'db' from Firebase
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import 'doc' and 'getDoc' from Firestore
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

function CreateCourse() {
  const navigate = useNavigate();
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
        navigate(`/course-dashboard/${id}`);
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error("Validation error:", err.message);
    }
  };

  return (
    <section>
      <div className="page-header min-vh-100">
        <div className=" mx-auto">
          <div className="">
            <div className="">
              <h2 className="text-lg font-bold mt-4">Course</h2>
              <p className="my-4">Create Course</p>
            </div>
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
            <div className="-footer text-center pt-0 px-lg-2 px-1">
              {/* <p className="mb-2 text-sm mx-auto">
                Don&apos;t have an account?
                <Link to="/" style={{ textDecoration: "none" }}>
                  <a className=" ml-4 text-primary text-gradient font-weight-bold">
                    Register
                  </a>
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateCourse;
