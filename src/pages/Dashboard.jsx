import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useSelector((s) => s.user);
  console.log(user.role);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Hello, {user?.name || "Student"} 👋
        </h1>
        <p className="text-gray-700 mb-6">
          Welcome to your dashboard. Here you can manage your courses, check
          updates, and continue learning.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/dashboard/my-courses"
            className="block bg-blue-600 text-white text-center py-4 rounded-lg shadow hover:bg-blue-700 transition"
          >
            📚 My Courses
          </Link>

          <Link
            to="/courses"
            className="block bg-green-600 text-white text-center py-4 rounded-lg shadow hover:bg-green-700 transition"
          >
            ➕ Browse Courses
          </Link>

          <Link
            to="/news"
            className="block bg-yellow-500 text-white text-center py-4 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            📰 Latest News
          </Link>

          <Link
            to="/contact"
            className="block bg-purple-600 text-white text-center py-4 rounded-lg shadow hover:bg-purple-700 transition"
          >
            📩 Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
