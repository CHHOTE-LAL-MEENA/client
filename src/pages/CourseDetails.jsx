import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../utils/api/client";

export default function CourseDetails() {
  const { id } = useParams();
  const { token, user } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await api(`/courses/${id}`, { method: "GET", token });
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  const handleEnroll = async () => {
    if (!token) {
      setMessage("Please login to enroll in this course.");
      return;
    }

    try {
      const res = await api(`/courses/${id}/enroll`, { method: "POST", token });
      setMessage(res.message || "Enrolled successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-2">{course.description}</p>
      <p className="mb-2">
        <strong>Teacher:</strong> {course.teacher?.name || "N/A"}
      </p>
      <div className="mb-4">
        <strong>Course Content:</strong>
        {course.content.length === 0 ? (
          <p>No content available</p>
        ) : (
          <ul className="list-disc ml-6">
            {course.content.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">{item.title}</span>
                <br />
                <span className="font-semibold">URL : </span>
                {item.url} <br />
                {item.type}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mb-4">
        <strong>Price:</strong> ${course.price}
      </p>

      {user && user.role === "student" && (
        <button
          onClick={handleEnroll}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enroll Now
        </button>
      )}

      {message && (
        <p className="mt-4 text-green-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
