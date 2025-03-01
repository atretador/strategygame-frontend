import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; // Import Navbar component
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer"; // Import Footer component
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Make sure to import the global CSS for styling

function App() {
  return (
    <Router>
      <div className="app">
        {/* Add Navbar globally so it appears on all pages */}
        <Navbar />

        <div className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard route */}
          </Routes>
        </div>

        {/* Footer will always appear at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;