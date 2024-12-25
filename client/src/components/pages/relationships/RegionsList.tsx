import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegion } from "../../../types/relationShips";
import { fetchRegionsList } from "../../../fatches/relationships";

const RegionsList: React.FC = () => {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const data = await fetchRegionsList();
        setRegions(data);
      } catch (error) {
        console.error("Failed to load regions list:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRegions();
  }, []);

  const handleRegionClick = (regionName: string) => {
    navigate("/top-groups", { state: { regionName } });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1  className="text-3xl font-semibold text-center">
        Select an area to see data
      </h1>
      <ul className="divide-y divide-gray-200 border rounded-lg shadow-md">
        {regions.map((region, index) => (
          <li
            key={index}
            className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleRegionClick(region.region)}
          >
            <span className="font-medium text-gray-700">{region.region}</span>
            <span className="text-gray-500">
              {region.casualties.toLocaleString()} casualties
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionsList;
