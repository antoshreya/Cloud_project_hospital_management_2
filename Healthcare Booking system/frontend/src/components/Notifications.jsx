import { useEffect, useState } from "react";

const Notifications = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const today = new Date().toISOString().split("T")[0];

    const upcomingReminders = storedAppointments.filter(
      (appt) => appt.status === "Approved" && appt.date >= today
    );

    setReminders(upcomingReminders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Appointment Reminders</h1>

        {reminders.length === 0 ? (
          <p className="text-gray-600 text-center">No upcoming appointments to remind.</p>
        ) : (
          <div className="grid gap-6">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="border p-6 rounded-lg shadow bg-blue-50">
                <h3 className="text-xl font-semibold text-blue-800">{reminder.doctor}</h3>
                <p className="text-gray-700 mt-2"><strong>Date:</strong> {reminder.date}</p>
                <p className="text-gray-700"><strong>Time:</strong> {reminder.time}</p>
                <p className="text-green-600 mt-2 font-semibold">Don't forget your appointment!</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
