

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Home from "./components/pages/Home";
import DocumentViewer from "./components/pages/DocumentViewer";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import CourseList from "./components/pages/CourseList";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* ✅ fixed login route */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard/course" replace />}
      />

      <Route
        path="/dashboard/*"
        element={user  ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route path="/document/:id" element={<DocumentViewer />} />
      <Route path="/course/:id" element={<CourseList />} />

      {/* Catch-all redirect */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}
