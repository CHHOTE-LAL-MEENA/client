import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ roles }) {
  const { user, token } = useSelector((s) => s.user);
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace />;

  if (roles && user && !roles.includes(user.role)) {
    // admin ne student dashboard kholne ki koshish ki
    if (user.role === "admin" && location.pathname.startsWith("/dashboard")) {
      return <Navigate to="/admin" replace />;
    }

    // student ne admin panel khola
    if (user.role === "student" && location.pathname.startsWith("/admin")) {
      return <Navigate to="/" replace />;
    }

    // Default redirect
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
