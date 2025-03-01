import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css"; // Import the CSS for styling

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message on each new attempt

    try {
      const response = await axios.post("http://localhost:5064/api/auth/register", {
        userName,
        email,
        password,
      });

      // If registration is successful, store token and redirect to home
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redirect to homepage after registration
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      // Handle different types of errors (network issues, invalid credentials, etc.)
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false); // Reset loading state after request completion
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;