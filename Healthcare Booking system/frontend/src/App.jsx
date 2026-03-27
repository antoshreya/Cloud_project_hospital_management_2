import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthDoctor from "./pages/AuthDoctor";
import AuthPatient from "./pages/AuthPatient";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import BookAppointment from "./components/BookAppointment";
import ManageAppointments from "./components/ManageAppointments";
import ViewPatients from "./components/ViewPatients";
import ManagePrescriptions from "./components/ManagePrescriptions";
import AppointmentHistory from "./components/AppointmentHistory";
import Notifications from "./components/Notifications";
import Contact from "./pages/Contact"; // ✅ Import the Contact page

function App() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userType");
    if (storedUser) {
      setUserType(storedUser);
    }
  }, []);

  return (
    <Router>
      <Navbar userType={userType} setUserType={setUserType} />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} /> {/* ✅ Contact page route */}

          {/* ✅ Auth Pages */}
          <Route path="/auth-doctor" element={<AuthDoctor setUserType={setUserType} />} />
          <Route path="/auth-patient" element={<AuthPatient setUserType={setUserType} />} />

          {/* ✅ Functional Pages */}
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/manage-appointments" element={<ManageAppointments />} />
          <Route path="/manage-prescriptions" element={<ManagePrescriptions />} />
          <Route path="/view-patients" element={<ViewPatients />} />
          <Route
            path="/notifications"
            element={userType === "patient" ? <Notifications /> : <Navigate to="/auth-patient" />}
          />

          {/* ✅ Dashboards */}
          <Route
            path="/patient-dashboard"
            element={userType === "patient" ? <PatientDashboard /> : <Navigate to="/auth-patient" />}
          />
          <Route
            path="/doctor-dashboard"
            element={userType === "doctor" ? <DoctorDashboard /> : <Navigate to="/auth-doctor" />}
          />

          {/* ✅ Appointment History */}
          <Route
            path="/appointment-history"
            element={userType === "patient" ? <AppointmentHistory /> : <Navigate to="/auth-patient" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
