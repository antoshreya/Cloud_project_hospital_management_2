import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[80vh] flex flex-col">
      {/* Hero Section */}
      <div className="bg-gray-100 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 h-full w-full">
        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Making Health Care Better Together
          </h1>
          <p className="text-gray-700 mb-8">
            Your trusted partner in quality healthcare. Convenient access, compassionate service, and expert care—right when you need it.
          </p>
          <div className="flex space-x-4">
            <Link to="/auth-patient">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Patient Login / Signup
              </button>
            </Link>
            <Link to="/auth-doctor">
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">
                Doctor Login / Signup
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-full flex-grow flex items-center justify-center">
          <img
            src="https://i.pinimg.com/736x/2c/f5/a2/2cf5a29571f834dc1631668a87282a06.jpg"
            alt="Doctor and Patient"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-blue-600 text-white py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white text-blue-700 rounded-xl p-6 text-center shadow">
            <h3 className="font-bold text-lg mb-2">Primary Care</h3>
            <p>Comprehensive care for all your health needs.</p>
          </div>
          <div className="bg-white text-blue-700 rounded-xl p-6 text-center shadow">
            <h3 className="font-bold text-lg mb-2">Emergency Cases</h3>
            <p>24/7 emergency response for urgent situations.</p>
          </div>
          <div className="bg-white text-blue-700 rounded-xl p-6 text-center shadow">
            <h3 className="font-bold text-lg mb-2">Online Appointment</h3>
            <p>Schedule your visit online quickly and easily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
