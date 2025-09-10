import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";

export default function Profile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  // 🔹 Listen for login/logout
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => unsub();
  }, []);

  // 🔹 Fetch Firestore profile when logged in
  useEffect(() => {
    if (!authUser) {
      setStudent(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const ref = doc(db, "students", authUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setStudent(snap.data());
        } else {
          console.warn("⚠️ No Firestore doc found for this student.");
          setStudent({ email: authUser.email });
        }
      } catch (err) {
        console.error("Error fetching student profile ❌", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser]);

  // 🔹 Redirect when logged out
  useEffect(() => {
    if (!loading && !authUser) {
      navigate("/login");
    }
  }, [authUser, loading, navigate]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  if (!student) {
    return null; // nothing to render since redirect is happening
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            {student?.name ? student.name.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {student?.name || "Unknown"}
            </h2>
            <p className="text-gray-500">{student?.email || "No email"}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Year</p>
            <p className="font-medium">{student?.year || "-"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{student?.department || "-"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Section</p>
            <p className="font-medium">{student?.section || "-"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Adviser</p>
            <p className="font-medium">{student?.adviser || "-"}</p>
          </div>
        </div>

        <button
          onClick={() => auth.signOut()}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
