import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase"; // Import 'auth' and 'db' from Firebase
import { doc, getDoc } from "firebase/firestore"; // Import 'doc' and 'getDoc' from Firestore
import { useNavigate } from "react-router-dom"; // Import 'useNavigate' hook from react-router-dom
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function LecturerAuth() {
  const navigate = useNavigate(); // Use the 'useNavigate' hook to navigate

  const handleSignUp = async () => {
    try {
      let email = document.getElementById("email").value.toLowerCase();
      let password = document.getElementById("password").value;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem("UID", user.uid);
      validateUser(user.uid);
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
        navigate(`/Dashboard?name=${id}`);
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
        <div className="container">
          <div className="row">
            <div className="col-md-7 d-flex flex-column mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4 className="font-weight-bolder">Log in</h4>
                  <p className="mb-0">Enter email and password to Log in</p>
                </div>
                <div className="card-body">
                  <form role="form">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-brand-500 dark:focus:ring-brand-500/50"
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <div className="mb-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-brand-500 dark:focus:ring-brand-500/50"
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        id="signUp"
                        className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                        onClick={handleSignUp}
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                  <p className="mb-2 text-sm mx-auto">
                    Don&apos;t have an account?
                    <Link
                      to="/Registeradmin"
                      style={{ textDecoration: "none" }}
                    >
                      <a className="text-primary text-gradient font-weight-bold">
                        Register
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LecturerAuth;
