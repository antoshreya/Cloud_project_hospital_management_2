import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  return (
    <div
      className="min-h-screen px-6 py-10 flex flex-col items-center"
      style={{
        backgroundImage: `url('https://hmsoftwarez.com/images/pages/software/banner.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">Doctor Dashboard</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-7xl w-full justify-items-center">
        {/* View Patients */}
        <div className="w-full max-w-md backdrop-blur-lg bg-white/40 p-6 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">👩‍⚕️ View Patients</h3>
          <p className="text-sm text-gray-700 mb-5">Access patient information and medical history.</p>
          <Link
            to="/view-patients"
            className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Patients
          </Link>
        </div>

        {/* Manage Appointments */}
        <div className="w-full max-w-md backdrop-blur-lg bg-white/40 p-6 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">📅 Manage Appointments</h3>
          <p className="text-sm text-gray-700 mb-5">View, approve, or reject patient appointments.</p>
          <Link
            to="/manage-appointments"
            className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
