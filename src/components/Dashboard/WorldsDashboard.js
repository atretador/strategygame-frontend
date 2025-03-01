import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./WorldsDashboard.css";

const WorldsDashboard = () => {
  const [worldSettings, setWorldSettings] = useState([]);
  const [worlds, setWorlds] = useState([]);
  const [errorWorldSettings, setErrorWorldSettings] = useState(null);
  const [errorWorlds, setErrorWorlds] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch World Settings
    const fetchWorldSettings = async () => {
      try {
        const response = await api.get("WorldSettings/getAll");
        setWorldSettings(response.data);
      } catch (error) {
        setErrorWorldSettings("Failed to fetch world settings.");
        console.error(error);
      }
    };

    // Fetch Worlds
    const fetchWorlds = async () => {
      try {
        const response = await api.get("Worlds/getAll");
        setWorlds(response.data);
      } catch (error) {
        setErrorWorlds("Failed to fetch worlds.");
        console.error(error);
      }
    };

    fetchWorldSettings();
    fetchWorlds();
  }, []);

  const handleAddWorldSetting = () => {
    navigate("/dashboard/worldSettings/Add");
  };

  const handleEditWorldSetting = (id) => {
    navigate(`/dashboard/worldSettings/Edit/${id}`);
  };

  const handleRemoveWorldSetting = async (id) => {
    try {
      await api.delete(`WorldSettings/remove/${id}`);
      setWorldSettings((prev) => prev.filter((ws) => ws.id !== id));
    } catch (error) {
      setErrorWorldSettings("Failed to remove world setting.");
      console.error(error);
    }
  };

  const handleGenerateWorld = () => {
    navigate("/Dashboard/Worlds/Generate");
  };

  const handleWorldOverview = (id) => {
    navigate(`/Dashboard/Worlds/Overview/${id}`);
  };

  return (
    <div className="worlds-dashboard">
      {/* World Settings Section */}
      <div className="world-settings-container">
        <div className="header">
          <h2>World Settings</h2>
        </div>
        {errorWorldSettings && <div className="error">{errorWorldSettings}</div>}
        <div className="world-settings-list-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {worldSettings.length > 0 ? (
                worldSettings.map((setting) => (
                  <tr key={setting.id}>
                    <td>{setting.name}</td>
                    <td>{setting.description}</td>
                    <td className="actions">
                      <button
                        className="edit"
                        onClick={() => handleEditWorldSetting(setting.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove"
                        onClick={() => handleRemoveWorldSetting(setting.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No world settings available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          className="add-world-setting-btn"
          onClick={handleAddWorldSetting}
        >
          Add New World Setting
        </button>
      </div>

      {/* Worlds Section */}
      <div className="worlds-container">
        <div className="header">
          <h2>Worlds</h2>
        </div>
        {errorWorlds && <div className="error">{errorWorlds}</div>}
        <div className="worlds-list-container">
          <table>
            <thead>
              <tr>
                <th>World Name</th>
                <th>Is Live</th>
                <th>Is Open</th>
                <th>World Settings Name</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {worlds.length > 0 ? (
                worlds.map((world) => (
                  <tr key={world.id}>
                    <td>{world.name}</td>
                    <td>{world.isLive ? "Yes" : "No"}</td>
                    <td>{world.isOpen ? "Yes" : "No"}</td>
                    <td>{world.worldSettingsName}</td>
                    <td className="actions">
                      <button
                        className="overview"
                        onClick={() => handleWorldOverview(world.id)}
                      >
                        Overview
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No worlds available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          className="generate-world-btn"
          onClick={handleGenerateWorld}
        >
          Generate New World
        </button>
      </div>
    </div>
  );
};

export default WorldsDashboard;