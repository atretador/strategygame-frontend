import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Updated styles

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2 className="sidebar-header">Dashboard</h2>
      <ul className="sidebar-list">
        <li>
          <Link to="/dashboard/worlds" className="sidebar-link">
            Worlds
          </Link>
        </li>
        <li>
          <Link to="/dashboard/factions" className="sidebar-link">
            Factions
          </Link>
        </li>
        <li>
          <Link to="/dashboard/factions" className="sidebar-link">
            Buildings
          </Link>
        </li>
        <li>
          <Link to="/dashboard/resources" className="sidebar-link">
            Resources
          </Link>
        </li>
        <li>
          <Link to="/dashboard/factions" className="sidebar-link">
            Military Units
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
