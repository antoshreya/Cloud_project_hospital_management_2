import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const today = new Date().toISOString().split("T")[0];

    const upcoming = storedAppointments.filter(
      (appt) => appt.status === "Approved" && appt.date >= today
    );

    setAppointments(upcoming);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Patient Dashboard</h1>

        <div className="flex justify-end mb-6">
          <Link
            to="/book-appointment"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          >
            Book New Appointment
          </Link>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-gray-600">No upcoming appointments. Book one now!</p>
          ) : (
            <div className="grid gap-6">
              {appointments.map((appt) => (
                <div key={appt.id} className="border p-6 rounded-lg shadow bg-gray-50">
                  <h3 className="text-xl font-semibold text-blue-700">{appt.doctor}</h3>
                  <p className="text-gray-700 mt-2"><strong>Date:</strong> {appt.date}</p>
                  <p className="text-gray-700"><strong>Time:</strong> {appt.time}</p>
                  <p className="text-green-600 font-bold mt-2">{appt.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
