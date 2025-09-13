import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../utils/api/client";

export default function CourseContent() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadContent() {
      try {
        const data = await api(`/courses/${courseId}/content`);
        // backend returns array: [{ title, type, url }]
        setLessons(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadContent();
  }, [courseId]);

  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Course Content</h2>
      {lessons.length === 0 ? (
        <p className="text-gray-600">No lessons available.</p>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
              {lesson.type === "video" && lesson.url && (
                <video controls className="w-full rounded-lg">
                  <source src={lesson.url} type="video/mp4" />
                </video>
              )}
              {lesson.type === "pdf" && lesson.url && (
                <Link
                  to={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Open PDF
                </Link>
              )}
              {lesson.type === "text" && lesson.url && (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {lesson.url}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
