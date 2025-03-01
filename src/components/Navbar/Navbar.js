import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication by making an API request to the new is-authenticated endpoint
    axios.get("http://localhost:5064/api/Auth/is-authenticated", {
      withCredentials: true, // Ensure cookies are sent with the request
    })
    .then((response) => {
      // If the response is successful, the user is authenticated
      setIsAuthenticated(true);
    })
    .catch((error) => {
      // If there's an error (e.g., 401 Unauthorized), the user is not authenticated
      setIsAuthenticated(false);
    });
  }, []);

  const handleLogout = async () => {
    try {
      // Make an API call to log out the user on the server
      await axios.post("http://localhost:5064/api/Auth/logout", {}, { withCredentials: true });

      // Remove the authentication cookie manually after the server-side logout
      document.cookie = ".AspNetCore.Identity.Application=;expires=Thu, 01 Jan 1970 00:00:00 GMT";  // Clear the cookie

      setIsAuthenticated(false); // Update the authentication state to false
      navigate("/"); // Redirect to the home page or login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Strategy Game</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;