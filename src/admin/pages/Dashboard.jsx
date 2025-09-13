import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);

  const items = [
    {
      title: "Manage Users",
      description: "View all registered users in the system",
      path: "/admin/users",
    },
    {
      title: "Manage Teachers",
      description: "Create, update and view teachers",
      path: "/admin/teachers",
    },
    {
      title: "Manage Courses",
      description: "Create, update and view all courses",
      path: "/admin/courses",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Hello, {user?.name || "Student"} 👋
      </h1>
      <p className="text-gray-700 mb-6">
        Welcome to your dashboard. Here you can manage your courses, check
        updates, and continue learning.
      </p>

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="cursor-pointer p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <button
              onClick={() => navigate(item.path)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
