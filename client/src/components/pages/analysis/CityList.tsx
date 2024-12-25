import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGetCountryDetails } from "../../../fatches/analysis";
import { ICountryData, IEvent } from "../../../types/analysis";
import "leaflet/dist/leaflet.css";

const CityList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { countryName } = location.state as { countryName: string }; 

  const [countryData, setCountryData] = useState<ICountryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetCountryDetails(countryName);
      setCountryData(data);
    };
    fetchData();
  }, [countryName]);

  const handleViewMap = (events: IEvent[]) => {
    const validEvents = events.filter(
      (event) => event.latitude !== null && event.longitude !== null
    );

    if (validEvents.length > 0) {
      const mapProps = {
        center: [validEvents[0].latitude!, validEvents[0].longitude!],
        zoom: 10,
        markers: validEvents.map((event) => ({
          latitude: event.latitude!,
          longitude: event.longitude!,
          popupText: `Casualties: ${event.casualties || 0}`,
        })),
      };

      navigate("/map", { state: mapProps });
    } else {
      setError("No valid coordinates available for this city.");
    }
  };

  if (!countryData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">
        Cities in {countryData.country}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="divide-y divide-gray-200 border rounded-lg shadow-md">
        {countryData.cities.map((city) => (
          <li
            key={city._id}
            className="px-4 py-2 flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">
              {city.city || "other"}
            </span>
            <div className="flex items-center">
              <span className="text-gray-500 mr-4">{city.sum} casualties</span>
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                onClick={() => handleViewMap(city.events)}
              >
                🗺️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
