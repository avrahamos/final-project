import React, { useState, useEffect } from "react";
import DashboardMap from "./DashboardMap";
import { useLocation } from "react-router-dom";
import { CityData } from "../../../../types/socket";

const CityMap: React.FC = () => {
  const location = useLocation() as unknown as Location & {
    state: { city: string; coordinates: CityData[] };
  };

  const [coordinates, setCoordinates] = useState<CityData[] | null>(null);
  const [cityName, setCityName] = useState<string>("");

  useEffect(() => {
    if (location.state) {
      setCoordinates(location.state.coordinates);
      setCityName(location.state.city);
    }
  }, [location.state]);

  if (!coordinates) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <h2 className="absolute top-4 left-4 text-xl font-bold text-white z-10">
        {`Locations in ${cityName}`}
      </h2>
      <div className="w-full h-full">
        <DashboardMap
          center={[
            coordinates[0]?.latitude || 0,
            coordinates[0]?.longitude || 0,
          ]}
          zoom={12}
          markers={
            coordinates.map((coord) => ({
              latitude: coord.latitude,
              longitude: coord.longitude,
              popupText: `City: ${cityName}`,
            })) || []
          }
        />
      </div>
    </div>
  );
};

export default CityMap;
