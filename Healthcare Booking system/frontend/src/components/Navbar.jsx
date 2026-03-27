import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userType, setUserType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    setUserType(null);
    navigate("/");
  };

  const buttonClass =
    "bg-white text-blue-500 px-3 py-1 rounded hover:bg-gray-100 transition";

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold">Healthcare System</h2>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/">
              <button className={buttonClass}>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <button className={buttonClass}>Contact Us</button>
            </Link>
          </li>

          {userType === "patient" && (
            <>
              <li>
                <Link to="/patient-dashboard">
                  <button className={buttonClass}>Dashboard</button>
                </Link>
              </li>
              <li>
                <Link to="/appointment-history">
                  <button className={buttonClass}>Appointment History</button>
                </Link>
              </li>
              <li>
                <Link to="/notifications">
                  <button className={buttonClass}>Reminders</button>
                </Link>
              </li>
            </>
          )}

          {userType === "doctor" && (
            <li>
              <Link to="/doctor-dashboard">
                <button className={buttonClass}>Dashboard</button>
              </Link>
            </li>
          )}

          {!userType ? (
            <>
              <li>
                <Link to="/auth-patient">
                  <button className={buttonClass}>Patient Login / Signup</button>
                </Link>
              </li>
              <li>
                <Link to="/auth-doctor">
                  <button className={buttonClass}>Doctor Login / Signup</button>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className={buttonClass}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
