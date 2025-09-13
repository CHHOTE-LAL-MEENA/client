import React from "react";

export default function News() {
  const newsList = [
    { id: 1, title: "New React Course Launched", date: "Aug 15, 2025" },
    { id: 2, title: "AI in Education Webinar", date: "Sep 02, 2025" },
    { id: 3, title: "Scholarships Available", date: "Sep 10, 2025" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">Latest News</h1>
        <ul className="max-w-2xl mx-auto space-y-6">
          {newsList.map((item) => (
            <li
              key={item.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-500">{item.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
