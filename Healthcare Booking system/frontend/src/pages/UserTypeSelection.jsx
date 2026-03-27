import { useNavigate } from "react-router-dom";

const UserTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Are you a Patient or a Doctor?</h2>
        <button className="bg-orange-500 text-white py-2 px-4 rounded-md" onClick={() => navigate("/signup-patient")}>
          I'm a Patient
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md ml-4" onClick={() => navigate("/signup-doctor")}>
          I'm a Doctor
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
