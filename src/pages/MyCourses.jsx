import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { api } from "../utils/api/client";

export default function MyCourses() {
  const { token, user } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchEnrolledCourses = async () => {
      try {
        const data = await api("/users/me/enrolled-courses", {
          method: "GET",
          token,
        });
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [token]);

  if (!user) return <p>Please login to see your courses.</p>;
  if (loading) return <p>Loading your courses...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  if (courses.length === 0)
    return <p>You are not enrolled in any courses yet.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="my-2">{course.description}</p>
            <p className="mb-2">
              <strong>Teacher:</strong> {course.teacher?.name || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> ${course.price}
            </p>
            <Link
              to={`/courses/${course._id}`}
              className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
