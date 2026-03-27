import { useEffect, useState } from "react";

const AppointmentHistory = () => {
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const now = new Date();
    const past = storedAppointments.filter(appt => new Date(appt.date) < now);
    setPastAppointments(past);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Appointment History</h1>

        {pastAppointments.length === 0 ? (
          <p className="text-gray-600 text-center">No past appointments yet.</p>
        ) : (
          <div className="grid gap-6">
            {pastAppointments.map((appt, index) => (
              <div key={index} className="border p-6 rounded-lg shadow-md bg-gray-50">
                <h3 className="text-xl font-semibold text-blue-700">{appt.doctor}</h3>
                <p className="text-gray-700 mt-2">
                  <strong>Date:</strong> {appt.date}
                </p>
                <p className="text-gray-700">
                  <strong>Time:</strong> {appt.time}
                </p>
                <p className="text-gray-700">
                  <strong>Diagnosis:</strong> {appt.diagnosis || "N/A"}
                </p>
               
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
