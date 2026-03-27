import { useState, useEffect } from "react";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedAppointments = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const clearAppointments = () => {
    if (window.confirm("Are you sure you want to clear all appointments?")) {
      localStorage.removeItem("appointments");
      setAppointments([]);
      alert("All appointments cleared!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">Manage Appointments</h2>
        <button
          onClick={clearAppointments}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition"
        >
          Clear All
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-lg">
            <th className="border p-2">Patient Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt.id} className="text-center text-md">
                <td className="border p-2">{appt.patient.name}</td>
                <td className="border p-2">{appt.patient.email}</td>
                <td className="border p-2">{appt.patient.phone}</td>
                <td className="border p-2">{appt.doctor}</td>
                <td className="border p-2">{appt.date}</td>
                <td className="border p-2">{appt.time}</td>
                <td className="border p-2">{appt.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => updateStatus(appt.id, "Approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(appt.id, "Rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointments;
