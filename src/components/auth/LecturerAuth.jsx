import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase";
import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";

function LecturerAuth() {
  // const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        `${course}@gmail.com`,
        password
      );
      const user = userCredential.user;

      // localStorage.setItem("UID", user.uid);
      validateUser(user.uid);
      console.log("logged in");
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
        // navigate(`/Dashboard?name=${id}`);
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
              <p className="my-4">Enter course-id and password to Log in</p>
            </div>
            <div className="mb-4">
              <div className="mb-4">
                <Label htmlFor="email" className="">
                  Course id
                </Label>
                <Input
                  className="mt-2"
                  placeholder="Enter your course id"
                  type="text"
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <Label>Password</Label>
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
                  Log in
                </Button>
              </div>
            </div>
            <div className="-footer text-center pt-0 px-lg-2 px-1">
              <p className="mb-2 text-sm mx-auto">
                Don&apos;t have an account?
                <Link to="/" style={{ textDecoration: "none" }}>
                  <a className=" ml-4 text-primary text-gradient font-weight-bold">
                    Register
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LecturerAuth;
