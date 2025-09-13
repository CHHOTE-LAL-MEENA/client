import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

export default function Navbar() {
  const { user, token } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          E-Learning
        </Link>

        <div className="flex space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-300 transition">
            About
          </Link>
          <Link to="/courses" className="hover:text-yellow-300 transition">
            Courses
          </Link>
          <Link to="/news" className="hover:text-yellow-300 transition">
            News
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <span className="font-medium">Hi, {user?.name}</span>
              <Link
                to={
                  user?.role === "student"
                    ? "/dashboard"
                    : user?.role === "teacher"
                    ? "/dashboard/teacher"
                    : "/admin"
                }
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-lg hover:bg-yellow-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
