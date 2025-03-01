import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Correct path to Sidebar component
import FactionsDashboard from "../components/Dashboard/FactionsDashboard"; // Correct path to FactionsDashboard component
import ResourcesDashboard from "../components/Dashboard/ResourcesDashboard"; // Correct path to ResourcesDashboard component
import WorldsDashboard from "../components/Dashboard/WorldsDashboard"; // Correct path to WorldsDashboard component
import WorldSettingsForm from "../components/Dashboard/WorldSettingsForm"; // Correct path to AddWorldSettingsPage component
import './Dashboard.css'; // Import the CSS file for Dashboard styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar - fixed to the left */}
      <Sidebar />

      {/* Main content - next to the sidebar */}
      <div className="main-content">
        <Routes>
          {/* Use the 'element' prop and wrap the component */}
          <Route path="/factions" element={<FactionsDashboard />} />
          <Route path="/resources" element={<ResourcesDashboard />} />
          <Route path="/worlds" element={<WorldsDashboard />} />
          <Route path="/worldSettings/Add" element={<WorldSettingsForm mode="add" />} />
          <Route
            path="/worldSettings/Edit/:id"
            element={<WorldSettingsForm mode="edit" />}
          />
          {/* Add other routes for additional sections here */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;