
// import React, { useState } from "react";
// import { auth, db } from "../../firebase";
// import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,GoogleAuthProvider,signInWithPopup,} from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// function friendlyAuthMessage(code) {
//   switch (code) {
//     case "auth/invalid-email":
//       return "That email address doesn’t look right.";
//     case "auth/user-not-found":
//     case "auth/wrong-password":
//     case "auth/invalid-credential":
//       return "Invalid email or password. Please try again.";
//     case "auth/email-already-in-use":
//       return "An account already exists with this email.";
//     case "auth/weak-password":
//       return "Please use a stronger password (at least 6 characters).";
//     case "auth/too-many-requests":
//       return "Too many attempts. Please wait a moment and try again.";
//     case "auth/network-request-failed":
//       return "Network error. Check your connection and try again.";
//     default:
//       return "Something went wrong. Please try again.";
//   }
// }

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const saveUserToFirestore = async (user, extraName = null) => {
//     const userRef = doc(db, "users", user.uid);
//     const snap = await getDoc(userRef);

//     if (!snap.exists()) {
//       await setDoc(userRef, {
//         uid: user.uid,
//         name: extraName || user.displayName || "",
//         email: user.email,
//         createdAt: new Date().toISOString(),
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     setLoading(true);

//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email.trim(), password);
//       } else {
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email.trim(),
//           password
//         );
//         await updateProfile(userCredential.user, { displayName: name.trim() });
//         await saveUserToFirestore(userCredential.user, name.trim());
//       }
//     } catch (err) {
//       setFormError(friendlyAuthMessage(err.code));
//     }

//     setLoading(false);
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       await saveUserToFirestore(result.user);
//     } catch (err) {
//       if (err.code !== "auth/popup-closed-by-user") {
//         setFormError(friendlyAuthMessage(err.code));
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
//         <h2 className="text-3xl font-bold text-center text-gray-800">
//           {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
//         </h2>
//         <p className="mt-2 text-sm text-center text-gray-500">
//           {isLogin ? "Login to continue" : "Sign up to get started"}
//         </p>

//         {formError && (
//           <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//             {formError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 placeholder="Enter your name"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all"
//           >
//             {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-6">
//           <div className="flex-grow h-px bg-gray-300"></div>
//           <span className="px-2 text-gray-500 text-sm">or</span>
//           <div className="flex-grow h-px bg-gray-300"></div>
//         </div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-2 py-3 border rounded-xl hover:bg-gray-100 transition-all"
//         >
//           <img
//             src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           <span className="text-gray-700">Continue with Google</span>
//         </button>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="font-medium text-indigo-600 hover:underline"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
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
import { auth, db } from "../../firebase"; // adjust your path
// for animaation background
import Prism from '../../Backgrounds/Prism/Prism'
import LightRays from '../../Backgrounds/LightRays/LightRays'
import Silk from '../../Backgrounds/Silk/Silk'
import Galaxy from '../../Backgrounds/Galaxy/Galaxy'
// styles
import '../../App.css'
import './Login.css'

export default function Authpage() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔹 Custom error messages
  const getErrorMessage = (code) => {
    switch (code) {
      // case "auth/email-already-in-use":
      //   return "This email is already registered. Please log in.";
      // case "auth/invalid-email":
      //   return "Please enter a valid email address.";
      // case "auth/weak-password":
      //   return "Password should be at least 6 characters.";
      // case "auth/user-not-found":
      // case "auth/wrong-password":
      //   return "Invalid email or password.";
      // default:
      //   return "Something went wrong. Please try again.";

      case "auth/invalid-email":
      return "That email address doesn’t look right.";
    case "auth/user-not-found":
      return "user not found.";
    case "auth/wrong-password":
      return "Invalid email or password.";
    case "auth/invalid-credential":
      return "Invalid email or password. Please try again.";
    case "auth/email-already-in-use":
      return "An account already exists with this email.";
    case "auth/weak-password":
      return "Please use a stronger password (at least 6 characters).";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
    }
  };

  // 🔹 Save user to Firestore (merge: true avoids overwrite)
  const saveUser = async (user, extraName = null) => {
    const ref = doc(db, "users", user.uid);
    const existing = await getDoc(ref);

    if (!existing.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        name: extraName || user.displayName || "",
        email: user.email,
        createdAt: new Date(),
      });
    }
  };

  // 🔹 Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await saveUser(res.user, name);
      navigate("/dashboard"); // instant redirect
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  // 🔹 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed ❌", err.code, err.message);
      setError(getErrorMessage(err.code));
      setErrorMsg("Invalid email or password. Please try again.");
    }
  };


  // 🔹 Google OAuth
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      await saveUser(res.user);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  return (
    <>
   
    <div className="container relative flex min-h-screen  items-center justify-center">
   
      
     <div className="absolute ray inset-0 -z-10">
      {/* <Galaxy/> */}
      <LightRays/>
      {/* <Prism /> */}
      {/* <Silk/> */}
  </div>

      <div className="login w-full max-w-md rounded-2xl  bg-white/80  p-8 shadow-lg   ">
        <h2 className="mb-6 text-center text-2xl  text-white font-bold ">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg text-white border px-3 py-2"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg  text-white border px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg  text-white border px-3 py-2"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 flex w-full items-center justify-center rounded-lg border py-2 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="mr-2 h-5 w-5"
          />
          Continue with Google
        </button>

        <p className="mt-4 text-center  text-white text-sm ">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
      
    </div> 
    
    
    </>
  );
}
