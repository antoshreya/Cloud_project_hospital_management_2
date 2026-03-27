import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPatient = ({ setUserType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("userType", "patient");
    setUserType("patient");

    // Save current patient details to localStorage
    const patientData = {
      name: email.split("@")[0], // Take name before "@" as patient's name
    };
    localStorage.setItem("currentPatient", JSON.stringify(patientData));

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Patient Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-white/30 rounded bg-white/20 placeholder-white text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-white/30 rounded bg-white/20 placeholder-white text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPatient;
