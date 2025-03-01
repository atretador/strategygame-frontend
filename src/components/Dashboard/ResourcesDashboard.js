import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Import the centralized axios instance
import './ResourcesDashboard.css';  // Make sure the CSS is imported

const ResourcesDashboard = () => {
  const [resources, setResources] = useState([]);
  const [newResourceName, setNewResourceName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editedResourceName, setEditedResourceName] = useState("");

  // Fetch all resources using the centralized API instance
  const fetchResources = async () => {
    try {
      const response = await api.get('ResourceData/getAll'); // Correct API endpoint
      setResources(response.data);
    } catch (error) {
      setError("Error fetching resources. Please try again.");
      console.error("Error fetching resources", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new resource using the centralized API instance
  const handleAddResource = async () => {
    if (!newResourceName) return;

    try {
      const resourceDto = { name: newResourceName };
      const response = await api.post('ResourceData/add', resourceDto); // Correct API endpoint
      setResources((prevResources) => [...prevResources, response.data]);
      setNewResourceName(""); // Reset input field after adding
    } catch (error) {
      setError("Error adding resource. Please try again.");
      console.error("Error adding resource", error);
    }
  };

  // Remove a resource using the centralized API instance
  const handleRemoveResource = async (id) => {
    try {
      await api.delete(`ResourceData/remove/${id}`); // Correct API endpoint
      setResources((prevResources) => prevResources.filter((resource) => resource.id !== id));
    } catch (error) {
      setError("Error removing resource. Please try again.");
      console.error("Error removing resource", error);
    }
  };

  // Edit a resource by selecting it for editing
  const handleEditResource = (id, name) => {
    setEditingResourceId(id);
    setEditedResourceName(name);
  };

  // Update a resource's name
  const handleUpdateResource = async () => {
    if (!editedResourceName) return;

    try {
      const resourceDto = { id: editingResourceId, name: editedResourceName };
      const response = await api.put('ResourceData/update', resourceDto); // Correct API endpoint
      setResources((prevResources) =>
        prevResources.map((resource) => resource.id === editingResourceId ? response.data : resource)
      );
      setEditingResourceId(null);
      setEditedResourceName(""); // Reset input field
    } catch (error) {
      setError("Error updating resource. Please try again.");
      console.error("Error updating resource", error);
    }
  };

  // Cancel editing a resource
  const handleCancelEdit = () => {
    setEditingResourceId(null);
    setEditedResourceName(""); // Clear name when canceling
  };

  // Fetch resources when the component mounts
  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="resources-dashboard">
      <h2>Resources Dashboard</h2>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Add New Resource Form */}
      <div>
        <input
          type="text"
          value={newResourceName}
          onChange={(e) => setNewResourceName(e.target.value)}
          placeholder="Enter new resource name"
        />
        <button className="add-resource-btn" onClick={handleAddResource}>Add New Resource</button>
      </div>

      {/* Resources List Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="resources-list-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className="actions">Actions</th> {/* Actions header */}
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td>
                    {editingResourceId === resource.id ? (
                      <input
                        type="text"
                        value={editedResourceName}
                        onChange={(e) => setEditedResourceName(e.target.value)}
                      />
                    ) : (
                      resource.name
                    )}
                  </td>
                  <td className="actions">
                    {editingResourceId === resource.id ? (
                      <>
                        <button onClick={handleUpdateResource}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditResource(resource.id, resource.name)}>Edit</button>
                        <button onClick={() => handleRemoveResource(resource.id)}>Remove</button>
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

export default ResourcesDashboard;