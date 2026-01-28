



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";




import LightRays from "../../Backgrounds/LightRays/LightRays";
import "../../App.css";
import "./Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [isStudent, setisStudent] = useState(false);

  // Student fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");

  // Staff fields
  const [staffName, setStaffName] = useState("");
  const [staffDept, setStaffDept] = useState("");
  const [staffSection, setStaffSection] = useState("");
  const [subject, setSubject] = useState("");
  const [masterKey, setMasterKey] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const STAFF_MASTER_KEY = "2311"; // 🔑 permanent staff login key

  
  // Save student in Firestore (with advisor mapping)
const saveStudent = async (user, extraName = null) => {
  const ref = doc(db, "students", user.uid);
  const existing = await getDoc(ref);

  if (!existing.exists()) {
    let adviser = "Not Assigned";

    try {
      // 🔎 Look for staff with same dept + section
      const staffSnap = await getDoc(doc(db, "staff", `${department}-${section}`));
      if (staffSnap.exists()) {
        adviser = staffSnap.data().name;
      }
    } catch (err) {
      console.error("Advisor lookup failed", err);
    }

    await setDoc(ref, {
      uid: user.uid,
      name: extraName || user.displayName || "",
      email: user.email,
      year,
      department,
      section,
      adviser,
      createdAt: new Date(),
    });
  }
};

  // Student signup
  const handleStudentSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await saveStudent(res.user, name);
      navigate("/dashboard/course");
    } catch (err) {
      setError(err.message);
    }
  };

  // Student login
  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard/course/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      await saveStudent(res.user);
      navigate("/dashboard/course/");
    } catch (err) {
      setError(err.message);
    }
    
    await signInWithPopup(auth, provider);
await saveStudentIfNotExists(auth.currentUser);
    navigate("/dashboard/course/");

  };
const saveStudentIfNotExists = async (user) => {
  const ref = doc(db, "students", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      name: user.displayName || "Student",
      email: user.email,
      department: "",
      year: "",
      section: "",
      adviser: "",
      createdAt: new Date(),
    });
  }
};


// 


  return (
    <div className="container relative flex min-h-screen items-center justify-center">
      <div className="absolute ray inset-0 -z-10">
        <LightRays />
      </div>

      <div className="login w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-lg">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => {
             
              setIsSignup(false);
            }}
            className={"px-4 py-2 rounded-lg bg-blue-900 border-green-500 border-2 text-white text-xl"}
          >
            Student
          </button>
         
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* STUDENT FORM */}
        {!isStudent && (
          <form
            onSubmit={isSignup ? handleStudentSignup : handleStudentLogin}
            className="space-y-4"
          >
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg text-black border px-3 py-2"
                />
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="w-full rounded-lg text-black border px-3 py-2"
                >
                  <option value="">Select Year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  className="w-full rounded-lg text-black border px-3 py-2"
                >
                  <option value="">Select Department</option>
                  <option>CSE</option>
                  <option>ECE</option>
                  <option>EEE</option>
                  <option>MECH</option>
                </select>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                  className="w-full rounded-lg text-black border px-3 py-2"
                >
                  <option value="">Select Section</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg text-black border px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg text-black border px-3 py-2"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
        )}

        {!isStudent && !isSignup && (
          // <button
          //   onClick={handleGoogleLogin}
          //   className="mt-4 flex w-full items-center justify-center rounded-lg border py-2 hover:bg-gray-500"
          // >
          //   <img
          //     src="https://www.svgrepo.com/show/355037/google.svg"
          //     alt="Google"
          //     className="mr-2 h-5 w-5"
          //   />
          //   Continue with Google
          // </button>
          <div className="relative mt-4">
  {/* 🔒 Coming Soon Tag */}
  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white shadow-lg">
    🔒 Coming Soon
  </div>

  {/* Blurred Google Button */}
  <button
    disabled
    className="flex w-full items-center justify-center rounded-lg border py-2 opacity-70 blur-[1.5px] cursor-not-allowed"
  >
    <img
      src="https://www.svgrepo.com/show/355037/google.svg"
      alt="Google"
      className="mr-2 h-5 w-5"
    />
    Continue with Google
  </button>
</div>

        )}

        {!isStudent && (
          <p className="mt-4 text-center text-white text-sm">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}



