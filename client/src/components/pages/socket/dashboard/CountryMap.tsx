import React, { useState, useEffect } from "react";
import DashboardMap from "./DashboardMap";
import { useLocation } from "react-router-dom";
import { CityData, CountryData } from "../../../../types/socket";
import SearchCities from "./SearchCities";


const CountryMap: React.FC = () => {
  const location = useLocation() as unknown as Location & {
    state: CountryData;
  };

  const [coordinates, setCoordinates] = useState<CountryData | null>(null);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    if (location.state) {
      setCoordinates(location.state);
    }
  }, [location.state]);

  if (!coordinates) {
    return <p>Loading...</p>;
  }

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      {showSearch && (
        <div className="absolute top-4 w-full max-w-md z-10 p-4">
          <button
            onClick={handleCloseSearch}
            className="absolute top-2 right-2 text-blue-500 hover:text-red-500 font-bold"
          >
            -
          </button>
          <div className="relative">
            <SearchCities />
          </div>
        </div>
      )}
      <div className="w-full h-full">
        <DashboardMap
          center={[32.0853, 34.7818]}
          zoom={6}
          markers={
            coordinates.cities.map((coord: CityData) => ({
              latitude: coord.latitude,
              longitude: coord.longitude,
              popupText: coord.city || "Unknown Location",
            })) || []
          }
        />
      </div>
    </div>
  );
};

export default CountryMap;
