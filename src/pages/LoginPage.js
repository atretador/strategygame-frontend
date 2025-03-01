import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css"; // Import the updated CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading immediately
    setError(""); // Reset any previous error messages

    try {
      const response = await axios.post("http://localhost:5064/api/Auth/login", {
        email,
        password,
      }, { withCredentials: true }); // Add { withCredentials: true } to send cookies

      // On successful login, no need to store tokens in localStorage, they are in cookies
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid login attempt");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false); // Reset loading state after request completion
      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className={`btn ${loading ? "btn-disabled" : ""}`} // Add disabled class when loading
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;