import { Navigate } from "react-router-dom";

// role: "user" ili "admin"
export default function ProtectedRoute({ children, role = "user" }) {
  const token = localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); // "user" ili "admin"

  // Nije ulogovan
  if (!token) return <Navigate to="/login" replace />;

  // Ulogovan ali nema admin prava
  if (role === "admin" && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
