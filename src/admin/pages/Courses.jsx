import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api/fetchWithAuth";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    teacher: "",
    content: [{ title: "", type: "video", url: "" }],
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    try {
      const data = await fetchWithAuth("/admin/courses");
      setCourses(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await fetchWithAuth(`/admin/courses/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setEditId(null);
      } else {
        await fetchWithAuth("/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setForm({
        title: "",
        description: "",
        price: "",
        teacher: "",
        content: [{ title: "", type: "video", url: "" }],
      });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (course) => {
    setEditId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      teacher: course.teacher,
      content: course.content?.length
        ? course.content
        : [{ title: "", type: "video", url: "" }],
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetchWithAuth(`/admin/courses/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  // Content (dynamic inputs for video/pdf/text)
  const handleContentChange = (index, field, value) => {
    const newContent = [...form.content];
    newContent[index][field] = value;
    setForm({ ...form, content: newContent });
  };

  const addContent = () => {
    setForm({
      ...form,
      content: [...form.content, { title: "", type: "video", url: "" }],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Teacher (User ID)"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />

        {/* Content Section */}
        <div className="space-y-2">
          <h2 className="font-semibold">Course Content</h2>
          {form.content.map((c, idx) => (
            <div key={idx} className="border p-3 rounded space-y-2">
              <input
                type="text"
                placeholder="Content Title"
                value={c.title}
                onChange={(e) =>
                  handleContentChange(idx, "title", e.target.value)
                }
                className="border p-2 rounded w-full"
                required
              />
              <select
                value={c.type}
                onChange={(e) =>
                  handleContentChange(idx, "type", e.target.value)
                }
                className="border p-2 rounded w-full"
              >
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="text">Text</option>
              </select>
              <input
                type="text"
                placeholder="Content URL"
                value={c.url}
                onChange={(e) =>
                  handleContentChange(idx, "url", e.target.value)
                }
                className="border p-2 rounded w-full"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addContent}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Content
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Course" : "Add Course"}
        </button>
      </form>

      <ul className="space-y-2">
        {courses.map((c) => (
          <li
            key={c._id}
            className="p-3 bg-gray-100 rounded flex justify-between"
          >
            <div>
              <strong>{c.title}</strong> - {c.description} (${c.price})
              <br />
              Teacher: {c.teacher?.name || c.teacher}
              <br />
              Content: {c.content?.length || 0} items
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(c)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
