import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase"; // Import 'auth' and 'db' from Firebase
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import 'doc' and 'getDoc' from Firestore
import { useNavigate } from "react-router-dom"; // Import 'useNavigate' hook from react-router-dom
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

function RegisterAdmin() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "admins", user.uid), {
        Firstname: firstName,
        Lastname: lastName,
        Email: email,
        isSuperAdmin: true,
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

  return (
    <section>
      <div className="page-header min-vh-100">
        <div className=" mx-auto">
          <div className="">
            <div className="">
              <h2 className="text-lg font-bold mt-4">Admin</h2>
              <p className="my-4">Create Admin account</p>
            </div>
            <div className="mb-4">
              <div className="mb-4">
                <Label htmlFor="firstname" className="">
                  Firstname
                </Label>
                <Input
                  className="mt-2"
                  placeholder="Enter your firstname"
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="lastname" className="">
                  Lastname
                </Label>
                <Input
                  className="mt-2"
                  placeholder="Enter your lastname"
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email" className="">
                  Email
                </Label>
                <Input
                  className="mt-2"
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  Log in
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

export default RegisterAdmin;
