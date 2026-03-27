import React, { useEffect, useState } from "react";

const ViewPatients = () => {
  const [appointments, setAppointments] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [notes, setNotes] = useState({});
  const [reports, setReports] = useState({});

  useEffect(() => {
    try {
      const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
      setAppointments(storedAppointments);

      const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
      const savedReports = JSON.parse(localStorage.getItem("reports")) || {};
      setNotes(savedNotes);
      setReports(savedReports);
    } catch (err) {
      console.error("Error reading from localStorage:", err);
      setAppointments([]);
    }
  }, []);

  const handleToggle = (index) => {
    setExpandedPatientId(expandedPatientId === index ? null : index);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = { ...notes, [index]: value };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleReportUpload = (index, file) => {
    const updatedReports = { ...reports, [index]: file.name };
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
  };

  const handleSave = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].notes = notes[index];
    updatedAppointments[index].report = reports[index];

    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    alert(
      `Saved for appointment ${index + 1}:\nNotes: ${notes[index] || "No notes"}\nReport: ${
        reports[index] || "No report"
      }`
    );
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = [...appointments];
      updatedAppointments.splice(index, 1);
      setAppointments(updatedAppointments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      // Also remove notes and reports if any
      const updatedNotes = { ...notes };
      delete updatedNotes[index];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      const updatedReports = { ...reports };
      delete updatedReports[index];
      setReports(updatedReports);
      localStorage.setItem("reports", JSON.stringify(updatedReports));

      // Collapse expanded view if it was deleted
      if (expandedPatientId === index) {
        setExpandedPatientId(null);
      }

      alert("Appointment deleted successfully!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Patient Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <React.Fragment key={index}>
                <tr className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{appointment.patient?.name || "N/A"}</td>
                  <td className="border p-2">{appointment.date || "N/A"}</td>
                  <td className="border p-2">{appointment.time || "N/A"}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleToggle(index)}
                    >
                      {expandedPatientId === index ? "Hide" : "View"}
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {expandedPatientId === index && (
                  <tr>
                    <td colSpan="5" className="border p-4 bg-gray-50">
                      <div className="text-left space-y-3">
                        <div><strong>Email:</strong> {appointment.patient?.email || "N/A"}</div>
                        <div><strong>Phone:</strong> {appointment.patient?.phone || "N/A"}</div>
                        <div><strong>Doctor:</strong> {appointment.doctor?.name || "N/A"}</div>
                        <div><strong>Reason:</strong> {appointment.reason || appointment.diagnosis || "N/A"}</div>
                        <div>
                          <strong>Upload Report:</strong>
                          <input
                            type="file"
                            onChange={(e) => handleReportUpload(index, e.target.files[0])}
                            className="ml-2"
                          />
                          {reports[index] && (
                            <span className="ml-2 text-sm text-green-600">{reports[index]}</span>
                          )}
                        </div>
                        <div>
                          <strong>Consultation Notes:</strong>
                          <textarea
                            value={notes[index] || ""}
                            onChange={(e) => handleNoteChange(index, e.target.value)}
                            rows="3"
                            className="w-full border p-2 mt-1"
                            placeholder="Enter notes here..."
                          />
                        </div>
                        <button
                          onClick={() => handleSave(index)}
                          className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewPatients;
