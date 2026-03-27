import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthDoctor = ({ setUserType }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint = isSignup ? "/api/doctor/signup" : "/api/doctor/signin";

  try {
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      if (isSignup) {
        alert("Sign up successful! Please sign in.");
        setIsSignup(false);
      } else {
        alert("Sign in successful!");
        localStorage.setItem("userType", "doctor");
        setUserType("doctor");
        navigate("/doctor-dashboard");
      }
    } else {
      alert(data.error || "Something went wrong.");
    }
  } catch (err) {
    alert("Server error.");
  }
};

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.leftSection}></div>

        <div style={styles.rightSection}>
          <div style={styles.formCard}>
            <div style={styles.tabs}>
              <div
                onClick={() => setIsSignup(true)}
                style={{ ...styles.tab, ...(isSignup ? styles.activeTab : {}) }}
              >
                Sign Up
              </div>
              <div
                onClick={() => setIsSignup(false)}
                style={{ ...styles.tab, ...(!isSignup ? styles.activeTab : {}) }}
              >
                Sign In
              </div>
            </div>

            <form style={styles.form} onSubmit={handleSubmit}>
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  style={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                style={styles.input}
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                style={styles.input}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="submit" style={styles.button}>
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
              <p style={styles.footerText}>
                {isSignup ? "Don't have an account?" : "Already have an account?"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    width: "100%",
    backgroundImage:
      'url("https://acsonnet.com/wp-content/uploads/2021/07/Hospital-Management-Software.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    width: "80%",
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: "25px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
  },
  leftSection: {
    flex: 1,
    backgroundImage:
      'url("https://tateeda.com/wp-content/uploads/2021/02/TITLE-6.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderTopLeftRadius: "25px",
    borderBottomLeftRadius: "25px",
  },
  rightSection: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f8f9fa",
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    width: "100%",
    maxWidth: "350px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  tabs: {
    display: "flex",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
  },
  tab: {
    flex: 1,
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "600",
    color: "#888",
  },
  activeTab: {
    borderBottom: "3px solid #007bff",
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  footerText: {
    textAlign: "center",
    marginTop: "10px",
    color: "#ff4b5c",
    fontSize: "14px",
  },
};

export default AuthDoctor;