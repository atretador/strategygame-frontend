import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../services/api";
import './WorldSettingsForm.css';

const WorldSettingsForm = ({ mode = 'add' }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    tickRateInMilliseconds: 0,
    resourceBaseProductionRate: 0,
    resourceProductionGrowthFactor: 0.0,
    defaultUnitMovementSpeed: 0.0,
    defaultUnitTrainingSpeed: 0.0,
    defaultConstructionSpeed: 0.0,
    defaultResearchSpeed: 0.0,
    maxSectorColumns: 0,
    maxSectorRows: 0,
    sectorSize: 0,
    boostedResearchBoost: null,
    researchModel: 0, // Default enum value
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (mode === 'edit' && id) {
      api.get(`Worldsettings/Get/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => console.error("Error fetching world settings:", error));
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
        tickRateInMilliseconds: 0,
        resourceBaseProductionRate: 0,
        resourceProductionGrowthFactor: 0.0,
        defaultUnitMovementSpeed: 0.0,
        defaultUnitTrainingSpeed: 0.0,
        defaultConstructionSpeed: 0.0,
        defaultResearchSpeed: 0.0,
        maxSectorColumns: 0,
        maxSectorRows: 0,
        sectorSize: 0,
        boostedResearchBoost: null,
        researchModel: 0,
      });
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'boostedResearchBoost'
        ? (value ? parseInt(value, 10) : null)
        : ['tickRateInMilliseconds', 'resourceBaseProductionRate', 'maxSectorColumns', 'maxSectorRows', 'sectorSize'].includes(name)
          ? parseInt(value, 10)
          : ['resourceProductionGrowthFactor', 'defaultUnitMovementSpeed', 'defaultUnitTrainingSpeed', 'defaultConstructionSpeed', 'defaultResearchSpeed'].includes(name)
            ? parseFloat(value)
            : name === 'researchModel'
              ? parseInt(value, 10)
              : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        await api.put(`WorldSettings/update/${formData.id}`, formData);
      } else {
        await api.post('WorldSettings/add', formData);
      }
      navigate('/Dashboard/WorldSettings');
    } catch (error) {
      console.error("Error saving world settings:", error.response?.data || error.message);
    }
  };

  return (
    <div className="world-settings-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {[
          { label: "Tick Rate (ms)", name: "tickRateInMilliseconds" },
          { label: "Resource Base Production Rate", name: "resourceBaseProductionRate" },
          { label: "Resource Production Growth Factor", name: "resourceProductionGrowthFactor" },
          { label: "Default Unit Movement Speed", name: "defaultUnitMovementSpeed" },
          { label: "Default Unit Training Speed", name: "defaultUnitTrainingSpeed" },
          { label: "Default Construction Speed", name: "defaultConstructionSpeed" },
          { label: "Default Research Speed", name: "defaultResearchSpeed" },
          { label: "Max Sector Columns", name: "maxSectorColumns" },
          { label: "Max Sector Rows", name: "maxSectorRows" },
          { label: "Sector Size", name: "sectorSize" },
          { label: "Boosted Research Boost", name: "boostedResearchBoost" },
        ].map(({ label, name }) => (
          <div key={name} className="form-field">
            <label htmlFor={name}>{label}</label>
            <input
              type="number"
              id={name}
              name={name}
              value={formData[name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="form-field">
          <label htmlFor="researchModel">Research Model</label>
          <select
            id="researchModel"
            name="researchModel"
            value={formData.researchModel}
            onChange={handleChange}
          >
            <option value="0">Select Model</option>
            <option value="1">Only on Capital</option>
            <option value="2">Boosted by Capital</option>
            <option value="3">Per City</option>
          </select>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WorldSettingsForm;