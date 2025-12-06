


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase"; 

// import LightRays from "../../Backgrounds/LightRays/LightRays";
// import "../../App.css";
// import "./Login.css";

// export default function Login() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [isStudent, setisStudent] = useState(false);
//   const [staffUnlocked, setStaffUnlocked] = useState(false); // NEW — controls staff form visibility

//   // common
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // student-specific
//   const [year, setYear] = useState("");
//   const [department, setDepartment] = useState("");
//   const [section, setSection] = useState("");

//   // staff-specific
//   const [subject, setSubject] = useState("");

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const STAFF_MASTER_KEY = "2311"; // 🔑 Permanent master key
//   const STAFF_PASSWORD = "2311";

//   // Error handling
//   const getErrorMessage = (code) => {
//     switch (code) {
//       case "auth/invalid-email":
//         return "That email address doesn’t look right.";
//       case "auth/user-not-found":
//         return "User not found.";
//       case "auth/wrong-password":
//       case "auth/invalid-credential":
//         return "Invalid email or password.";
//       case "auth/email-already-in-use":
//         return "An account already exists with this email.";
//       case "auth/weak-password":
//         return "Please use a stronger password (at least 6 characters).";
//       case "auth/too-many-requests":
//         return "Too many attempts. Please wait a moment and try again.";
//       case "auth/network-request-failed":
//         return "Network error. Check your connection and try again.";
//       default:
//         return "Something went wrong. Please try again.";
//     }
//   };

//   // Save student in Firestore
//   const saveStudent = async (user, extraName = null) => {
//     const ref = doc(db, "students", user.uid);
//     const existing = await getDoc(ref);

//     if (!existing.exists()) {
//       const adviser = "Not Assigned"; // (later: fetch staff adviser based on dept/section/year)

//       await setDoc(ref, {
//         uid: user.uid,
//         name: extraName || user.displayName || "",
//         email: user.email,
//         year,
//         department,
//         section,
//         adviser,
//         createdAt: new Date(),
//       });
//     }
//   };

//   // Student signup
//   const handleStudentSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       await saveStudent(res.user, name);
//       navigate("/dashboard/course");
//     } catch (err) {
//       setError(getErrorMessage(err.code));
//     }
//   };

//   // Student login
//   const handleStudentLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/dashboard/course");
//     } catch (err) {
//       setError(getErrorMessage(err.code));
//     }
//   };

//   // Google login
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const res = await signInWithPopup(auth, provider);
//       await saveStudent(res.user);
//       navigate("/dashboard/course");
//     } catch (err) {
//       setError(getErrorMessage(err.code));
//     }
//   };

  



// // const handleStaffUnlock = (e) => {
// //   e.preventDefault();
// //   if (password === STAFF_MASTER_KEY) {
// //     setStaffUnlocked(true);
// //     setError("");
// //     setPassword(""); // clear old password
// //   } else {
// //     setError("Invalid master key ❌");
// //   }
// // };
// const handleStaffLogin = async (e) => {
//   e.preventDefault();
//   setError("");

//   // 1️⃣ Validate email format
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     setError("Please enter a valid email address.");
//     return;
//   }

//   // 2️⃣ Validate password length
//   if (password.length < 6) {
//     setError("Password must be at least 6 characters.");
//     return;
//   }

//   try {
//     let user;

//     try {
//       // Try logging in first
//       const res = await signInWithEmailAndPassword(auth, email, password);
//       user = res.user;
//     } catch (err) {
//       if (err.code === "auth/user-not-found") {
//         // First-time staff: create Firebase Auth account
//         const res = await createUserWithEmailAndPassword(auth, email, password);
//         user = res.user;
//       } else {
//         throw err; // other errors
//       }
//     }

//     // Save/update staff info in Firestore
//     const staffRef = doc(db, "staff", user.uid);
//     await setDoc(
//       staffRef,
//       {
//         uid: user.uid,
//         name,
//         email,
//         department,
//         section,
//         subject,
//         role: "staff",
//         createdAt: new Date(),
//       },
//       { merge: true }
//     );

//     // Store session locally
//     localStorage.setItem(
//       "staff",
//       JSON.stringify({ uid: user.uid, email, name, department, section, subject })
//     );

//     navigate("/dashboard/admin");
//   } catch (err) {
//     console.error("Staff login/signup failed ❌", err);
//     setError(getErrorMessage(err.code) || err.message || "Staff login/signup failed ❌");
//   }
// };



//   return (
//     <div className="container relative flex min-h-screen items-center justify-center">
//       <div className="absolute ray inset-0 -z-10">
//         <LightRays />
//       </div>

//       <div className="login w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-lg">
//         <div className="flex justify-center space-x-4 mb-6">
//           <button
//             onClick={() => {
//               setisStudent(false);
//               setIsSignup(false);
//             }}
//             className={`px-4 py-2 rounded-lg ${
//               !isStudent
//                 ? "bg-blue-900 text-white text-2xl border-2 border-green-500"
//                 : "bg-blue-200 text-black-lg "
//             }`}
//           >
//             Student
//           </button>
//           <button
//             onClick={() => {
//               setisStudent(true);
//               setIsSignup(false);
//             }}
//             className={`px-4 py-2 rounded-lg ${
//               isStudent
//                 ? "bg-blue-900 text-white text-2xl border-2 border-green-500"
//                 : "bg-blue-200 text-black text-lg"
//             }`}
//           >
//             Staff
//           </button>
//         </div>

//         <h2 className="mb-6 text-center text-2xl text-white font-bold">
//           {isStudent ? (staffUnlocked ? "Staff Login" : "Staff Access Key") : isSignup ? "Create Account" : "Welcome Back"}
//         </h2>

//         {error && (
//           <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">{error}</p>
//         )}

//         {/* STUDENT FORM */}
//         {!isStudent && (
//           <form
//             onSubmit={isSignup ? handleStudentSignup : handleStudentLogin}
//             className="space-y-4"
//           >
//             {isSignup && (
//               <>
//                 <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg text-black border px-3 py-2" />
//                 <select value={year} onChange={(e) => setYear(e.target.value)} required className="w-full rounded-lg text-black border px-3 py-2">
//                   <option value="">Select Year</option>
//                   <option>1st Year</option>
//                   <option>2nd Year</option>
//                   <option>3rd Year</option>
//                   <option>4th Year</option>
//                 </select>
//                 <select value={department} onChange={(e) => setDepartment(e.target.value)} required className="w-full rounded-lg text-black border px-3 py-2">
//                   <option value="">Select Department</option>
//                   <option>CSE</option>
//                   <option>ECE</option>
//                   <option>EEE</option>
//                   <option>MECH</option>
//                 </select>
//                 <select value={section} onChange={(e) => setSection(e.target.value)} required className="w-full rounded-lg text-black border px-3 py-2">
//                   <option value="">Select Section</option>
//                   <option>A</option>
//                   <option>B</option>
//                   <option>C</option>
//                 </select>
//               </>
//             )}

//             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg text-black border px-3 py-2" />
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg text-black border px-3 py-2" />
//             <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
//               {isSignup ? "Sign Up" : "Login"}
//             </button>
//           </form>
//         )}

//         {/* STAFF ACCESS + LOGIN */}
//         {/* {isStudent && !staffUnlocked && (
//           <form onSubmit={handleStaffUnlock} className="space-y-4">
//             <input
//               type="password"
//               placeholder="Enter Master Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full rounded-lg text-black border px-3 py-2"
//             />
//             <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
//               Unlock Staff Login
//             </button>
//           </form>
//         )} */}

//        {isStudent && (
//   <form onSubmit={handleStaffLogin} className="space-y-4">
//     <input
//       type="text"
//       placeholder="Full Name"
//       value={name}
//       onChange={(e) => setName(e.target.value)}
//       required
//       className="w-full rounded-lg text-black border px-3 py-2"
//     />
//     <input
//       type="text"
//       placeholder="Department"
//       value={department}
//       onChange={(e) => setDepartment(e.target.value)}
//       required
//       className="w-full rounded-lg text-black border px-3 py-2"
//     />
//     <input
//       type="text"
//       placeholder="Section"
//       value={section}
//       onChange={(e) => setSection(e.target.value)}
//       className="w-full rounded-lg text-black border px-3 py-2"
//     />
//     <input
//       type="text"
//       placeholder="Subject"
//       value={subject}
//       onChange={(e) => setSubject(e.target.value)}
//       className="w-full rounded-lg text-black border px-3 py-2"
//     />
//     <input
//       type="email"
//       placeholder="Email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       required
//       className="w-full rounded-lg text-black border px-3 py-2"
//     />
//     <input
//       type="password"
//       placeholder="Password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       required
//       className="w-full rounded-lg text-black border px-3 py-2"
//     />
//     <button
//       type="submit"
//       className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
//     >
//       Login / Signup as Staff
//     </button>
//   </form>
// )}


//         {!isStudent && !isSignup && (
//           <button onClick={handleGoogleLogin} className="mt-4 flex w-full items-center justify-center rounded-lg border py-2 hover:bg-gray-500">
//             <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="mr-2 h-5 w-5" />
//             Continue with Google
//           </button>
//         )}

//         {!isStudent && (
//           <p className="mt-4 text-center text-white text-sm">
//             {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
//             <button onClick={() => setIsSignup(!isSignup)} className="text-blue-600 hover:underline">
//               {isSignup ? "Login" : "Sign Up"}
//             </button>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


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
      navigate("/dashboard/course");
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
      navigate("/dashboard/course");
    } catch (err) {
      setError(err.message);
    }
  };


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
          <button
            onClick={handleGoogleLogin}
            className="mt-4 flex w-full items-center justify-center rounded-lg border py-2 hover:bg-gray-500"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="mr-2 h-5 w-5"
            />
            Continue with Google
          </button>
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



