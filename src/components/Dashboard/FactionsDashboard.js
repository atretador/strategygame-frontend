import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Import the centralized axios instance
import './FactionsDashboard.css';  // Make sure the CSS is imported

const FactionsDashboard = () => {
  const [factions, setFactions] = useState([]);
  const [newFactionName, setNewFactionName] = useState("");
  const [newFactionDescription, setNewFactionDescription] = useState(""); // New state for description
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFactionId, setEditingFactionId] = useState(null);
  const [editedFactionName, setEditedFactionName] = useState("");
  const [editedFactionDescription, setEditedFactionDescription] = useState(""); // New state for editing description

  // Fetch all factions using the centralized API instance
  const fetchFactions = async () => {
    try {
      const response = await api.get('FactionData/getAll'); // Correct API endpoint
      setFactions(response.data);
    } catch (error) {
      setError("Error fetching factions. Please try again.");
      console.error("Error fetching factions", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new faction using the centralized API instance
  const handleAddFaction = async () => {
    if (!newFactionName || !newFactionDescription) return;

    try {
      const factionDto = { name: newFactionName, description: newFactionDescription };
      const response = await api.post('FactionData/add', factionDto); // Correct API endpoint
      setFactions((prevFactions) => [...prevFactions, response.data]);
      setNewFactionName("");
      setNewFactionDescription(""); // Reset description after adding
    } catch (error) {
      setError("Error adding faction. Please try again.");
      console.error("Error adding faction", error);
    }
  };

  // Remove a faction using the centralized API instance
  const handleRemoveFaction = async (id) => {
    try {
      await api.delete(`FactionData/remove/${id}`); // Correct API endpoint
      setFactions((prevFactions) => prevFactions.filter((faction) => faction.id !== id));
    } catch (error) {
      setError("Error removing faction. Please try again.");
      console.error("Error removing faction", error);
    }
  };

  // Edit a faction by selecting it for editing
  const handleEditFaction = (id, name, description) => {
    setEditingFactionId(id);
    setEditedFactionName(name);
    setEditedFactionDescription(description); // Set initial description for editing
  };

  // Update a faction's name and description
  const handleUpdateFaction = async () => {
    if (!editedFactionName || !editedFactionDescription) return;

    try {
      const factionDto = { id: editingFactionId, name: editedFactionName, description: editedFactionDescription };
      const response = await api.put('FactionData/Update', factionDto); // Correct API endpoint
      setFactions((prevFactions) =>
        prevFactions.map((faction) => faction.id === editingFactionId ? response.data : faction)
      );
      setEditingFactionId(null);
      setEditedFactionName("");
      setEditedFactionDescription(""); // Reset the description
    } catch (error) {
      setError("Error updating faction. Please try again.");
      console.error("Error updating faction", error);
    }
  };

  // Cancel editing a faction
  const handleCancelEdit = () => {
    setEditingFactionId(null);
    setEditedFactionName("");
    setEditedFactionDescription(""); // Clear description when canceling
  };

  // Fetch factions when the component mounts
  useEffect(() => {
    fetchFactions();
  }, []);

  return (
    <div className="factions-dashboard">
      <h2>Factions Dashboard</h2>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Add New Faction Form */}
      <div>
        <input
          type="text"
          value={newFactionName}
          onChange={(e) => setNewFactionName(e.target.value)}
          placeholder="Enter new faction name"
        />
        <textarea
          value={newFactionDescription}
          onChange={(e) => setNewFactionDescription(e.target.value)}
          placeholder="Enter faction description"
        />
        <button className="add-faction-btn" onClick={handleAddFaction}>Add New Faction</button>
      </div>

      {/* Factions List Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="factions-list-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th className="actions">Actions</th> {/* Actions header */}
              </tr>
            </thead>
            <tbody>
              {factions.map(faction => (
                <tr key={faction.id}>
                  <td>
                    {editingFactionId === faction.id ? (
                      <input
                        type="text"
                        value={editedFactionName}
                        onChange={(e) => setEditedFactionName(e.target.value)}
                      />
                    ) : (
                      faction.name
                    )}
                  </td>
                  <td>
                    {editingFactionId === faction.id ? (
                      <textarea
                        value={editedFactionDescription}
                        onChange={(e) => setEditedFactionDescription(e.target.value)}
                      />
                    ) : (
                      faction.description
                    )}
                  </td>
                  <td className="actions">
                    {editingFactionId === faction.id ? (
                      <>
                        <button onClick={handleUpdateFaction}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditFaction(faction.id, faction.name, faction.description)}>Edit</button>
                        <button onClick={() => handleRemoveFaction(faction.id)}>Remove</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FactionsDashboard;