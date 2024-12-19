import React, { useState, useEffect } from "react";
import { IHighCasualtyRegions } from "../../../types/analysis";
import { fetchGetHighCasualtyRegions } from "../../../fatches/analysis";
import { useNavigate } from "react-router-dom";

const CountryList: React.FC = () => {
  const [regions, setRegions] = useState<IHighCasualtyRegions[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetHighCasualtyRegions();
      setRegions(data);
    };
    fetchData();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleCountryClick = (countryName: string) => {
    navigate("/cities", { state: { countryName } });
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">High Casualty Regions</h1>
      <ul className="divide-y divide-gray-200 border rounded-lg shadow-md">
        {regions.slice(0, visibleCount).map((region, index) => (
          <li
            key={index}
            className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleCountryClick(region.country)}
          >
            <span className="font-medium text-gray-700">{region.country}</span>
            <span className="text-gray-500">
              {region.totalevg.toLocaleString()} casualties
            </span>
          </li>
        ))}
      </ul>
      {visibleCount < regions.length && (
        <button
          onClick={handleShowMore}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default CountryList;
