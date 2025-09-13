import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api/client";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.user); // get token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api("/courses", { method: "GET" });
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const handleViewDetails = (courseId) => {
    if (!token) {
      // not logged in -> go to register page
      navigate("/login");
    } else {
      // logged in -> go to course details
      navigate(`/courses/${courseId}`);
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
          <p className="mt-1 font-bold">Price: ${course.price}</p>
          <button
            onClick={() => handleViewDetails(course._id)}
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
