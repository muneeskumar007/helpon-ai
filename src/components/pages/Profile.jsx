
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { ThreeDot}  from "react-loading-indicators";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("Profile rendering with:", profile);


  useEffect(() => {
    const student = localStorage.getItem("student");
 


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

  if (loading) return 
   <p className="text-center p-6"><ThreeDot variant="pulsate" color="#1f13a4" size="large" text="⏳ loading" textColor="#172d68" />
 </p>;
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
              {profile?.type === "staff" ? (profile?.subject || "-") : "A.XAVIER MARY"}
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
