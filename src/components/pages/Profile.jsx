// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";

// export default function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [authUser, setAuthUser] = useState(null);
//   const navigate = useNavigate();

//   // 🔹 Listen for login/logout
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       setAuthUser(user);
//     });
//     return () => unsub();
//   }, []);

//   // 🔹 Fetch Firestore profile when logged in (student or staff)
//   useEffect(() => {
//     if (!authUser) {
//       setProfile(null);
//       setLoading(false);
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         // Determine user type from localStorage
//         let userType = null;
//         let staffEmail = null;
//         if (localStorage.getItem("student")) {
//           userType = "student";
//         } else if (localStorage.getItem("staff")) {
//           userType = "staff";
//           const staffObj = JSON.parse(localStorage.getItem("staff"));
//           staffEmail = staffObj?.email;
//         }

//         if (userType === "student") {
//           const ref = doc(db, "students", authUser.uid);
//           const snap = await getDoc(ref);
//           if (snap.exists()) {
//             setProfile({ ...snap.data(), type: "student" });
//           } else {
//             setProfile({ email: authUser.email, type: "student" });
//           }
//         } else if (userType === "staff" && staffEmail) {
//           // Staff doc uses safeEmail as ID
//           const safeEmail = staffEmail.replace(/\./g, "_").replace(/@/g, "_at_");
//           const ref = doc(db, "staff", safeEmail);
//           const snap = await getDoc(ref);
//           if (snap.exists()) {
//             setProfile({ ...snap.data(), type: "staff" });
//           } else {
//             setProfile({ email: staffEmail, type: "staff" });
//           }
//         } else {
//           setProfile({ email: authUser.email });
//         }
//       } catch (err) {
//         console.error("Error fetching profile ❌", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [authUser]);

//   // 🔹 Redirect when logged out
//   useEffect(() => {
//     if (!loading && !authUser) {
//       navigate("/login");
//     }
//   }, [authUser, loading, navigate]);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading profile...</p>;
//   }

//   if (!profile) {
//     return null; // nothing to render since redirect is happening
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <div className="bg-white shadow rounded-xl p-6">
//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center">
//             {profile?.name ? profile.name.charAt(0).toUpperCase() : "?"}
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">
//               {profile?.name || "Unknown"}
//             </h2>
//             <p className="text-gray-500">{profile?.email || "No email"}</p>
//             <p className="text-xs text-gray-400 mt-1">{profile?.type === "staff" ? "Staff" : "Student"}</p>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-4">
//           <div className="bg-gray-50 p-4 rounded">
//             <p className="text-sm text-gray-500">Year</p>
//             <p className="font-medium">{profile?.year || (profile?.type === "staff" ? "-" : "-")}</p>
//           </div>
//           <div className="bg-gray-50 p-4 rounded">
//             <p className="text-sm text-gray-500">Department</p>
//             <p className="font-medium">{profile?.department || "-"}</p>
//           </div>
//           <div className="bg-gray-50 p-4 rounded">
//             <p className="text-sm text-gray-500">Section</p>
//             <p className="font-medium">{profile?.section || (profile?.type === "staff" ? "-" : "-")}</p>
//           </div>
//           <div className="bg-gray-50 p-4 rounded">
//             <p className="text-sm text-gray-500">{profile?.type === "staff" ? "Subject" : "Adviser"}</p>
//             <p className="font-medium">{profile?.type === "staff" ? (profile?.subject || "-") : (profile?.adviser || "-")}</p>
//           </div>
//         </div>

//         <button
//           onClick={() => auth.signOut()}
//           className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const student = localStorage.getItem("student");
    const staff = localStorage.getItem("staff");

    // ✅ Case 1: Staff login (skip Firebase Auth completely)
    if (staff) {
      const staffObj = JSON.parse(staff);
      const safeEmail = staffObj.email.replace(/\./g, "_").replace(/@/g, "_at_");

      getDoc(doc(db, "staff", safeEmail))
        .then((snap) => {
          if (snap.exists()) {
            setProfile({ ...snap.data(), type: "staff" });
          } else {
            setProfile({ email: staffObj.email, type: "staff" });
          }
        })
        .finally(() => setLoading(false));
      return;
    }

    // ✅ Case 2: Student login (use Firebase Auth session)
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        navigate("/login"); // only redirect students
        return;
      }

      try {
        const ref = doc(db, "students", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile({ ...snap.data(), type: "student" });
        } else {
          setProfile({ email: user.email, type: "student" });
        }
      } catch (err) {
        console.error("Error fetching student profile ❌", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
  if (!profile) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{profile?.name || "Unknown"}</h2>
            <p className="text-gray-500">{profile?.email || "No email"}</p>
            <p className="text-xs text-gray-400 mt-1">
              {profile?.type === "staff" ? "Staff" : "Student"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Year</p>
            <p className="font-medium">{profile?.year || "-"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{profile?.department || "-"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Section</p>
            <p className="font-medium">{profile?.section || "-"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">
              {profile?.type === "staff" ? "Subject" : "Adviser"}
            </p>
            <p className="font-medium">
              {profile?.type === "staff" ? (profile?.subject || "-") : (profile?.adviser || "-")}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("staff");
            localStorage.removeItem("student");
            auth.signOut(); // only affects students
            navigate("/login");
          }}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
