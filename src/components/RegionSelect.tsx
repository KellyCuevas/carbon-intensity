import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const RegionSelect = () => {
  const { regionId = "" } = useParams();
  const navigate = useNavigate();
  const regions = [
    {
      id: 1,
      name: "North Scotland",
    },
    {
      id: 2,
      name: "South Scotland",
    },
    {
      id: 3,
      name: "North West England",
    },
    {
      id: 4,
      name: "North East England",
    },
    {
      id: 5,
      name: "Yorkshire",
    },
    {
      id: 6,
      name: "North Wales",
    },
    {
      id: 7,
      name: "South Wales",
    },
    {
      id: 8,
      name: "West Midlands",
    },
    {
      id: 9,
      name: "East Midlands",
    },
    {
      id: 10,
      name: "East England",
    },
    {
      id: 11,
      name: "South West England",
    },
    {
      id: 12,
      name: "South England",
    },
    {
      id: 13,
      name: "London",
    },
    {
      id: 14,
      name: "South East England",
    },
    {
      id: 15,
      name: "England",
    },
    {
      id: 16,
      name: "Scotland",
    },
    {
      id: 17,
      name: "Wales",
    },
    {
      id: 18,
      name: "GB",
    },
  ];

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/detail/${e.target.value}`);
  };
  return (
    <div className="region-selector">
      <label htmlFor="region-select">Change Region</label>
      <select onChange={handleRegionChange} id="region-select" value={regionId}>
        {regions.map((region) => (
          <option key={region.name + region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelect;
