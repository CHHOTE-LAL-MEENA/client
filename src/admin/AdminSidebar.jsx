import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Panel
      </h2>
      <nav className="flex-1 p-4 space-y-4">
        <Link to="/admin" className="block hover:text-yellow-400 ">
          Dashboard
        </Link>
        <Link to="/admin/users" className="block hover:text-yellow-400">
          Users
        </Link>
        <Link to="/admin/courses" className="block hover:text-yellow-400">
          Courses
        </Link>
        <Link to="/admin/teachers" className="block hover:text-yellow-400">
          Teachers
        </Link>
      </nav>
    </aside>
  );
}
