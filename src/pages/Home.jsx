import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to E-Learning Platform
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Learn anytime, anywhere with our interactive courses.
            </p>
            <div className="space-x-4">
              <Link
                to="/courses"
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                Explore Courses
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">Expert Tutors</h3>
                <p>
                  Learn from industry experts with years of teaching and
                  professional experience.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">
                  Flexible Learning
                </h3>
                <p>
                  Access courses anytime, anywhere on your schedule and pace.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">Certification</h3>
                <p>
                  Earn recognized certificates to boost your career and showcase
                  your skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="mb-8">
            Join thousands of students upgrading their skills with us.
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition"
          >
            Join Now
          </Link>
        </section>
      </div>
    </>
  );
}

export default Home;
