
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children, isAdmin }) {
  const staff = JSON.parse(localStorage.getItem("staff"));
  const user = auth.currentUser;

  if (isAdmin) {
    return staff ? children : <Navigate to="/login" />;
  } else {
    return user ? children : <Navigate to="/login" />;
  }
}
