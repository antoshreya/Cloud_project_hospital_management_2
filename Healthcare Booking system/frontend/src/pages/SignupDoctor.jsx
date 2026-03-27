import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Store doctor credentials in localStorage
    localStorage.setItem("doctorEmail", email);
    localStorage.setItem("doctorPassword", password);

    alert("Signup successful! Please login.");
    navigate("/login-doctor"); // Redirect to login
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Doctor Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupDoctor;
