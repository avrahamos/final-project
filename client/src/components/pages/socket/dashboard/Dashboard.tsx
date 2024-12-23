import React, { useEffect, useState } from "react";
import DashboardMap from "./DashboardMap";
import { connectSocket } from "../../../../socket/appIo";
import {
  disconnectListeners,
  fetchAllCoordinates,
  onCoordinatesList,
} from "../../../../socket/dashboard";
import Search from "./Search";
import { ICoordinate } from "../../../../types/socket";


const Dashboard: React.FC = () => {
  const [coordinates, setCoordinates] = useState<ICoordinate[]>([]);
  const [showSearch, setShowSearch] = useState(true);
  useEffect(() => {
    connectSocket();
    return () => {
      disconnectListeners();
    };
  }, []);

  useEffect(() => {
    fetchAllCoordinates();
    onCoordinatesList((data) => {
      setCoordinates(data);
    });
  }, []);

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
            <Search />
          </div>
        </div>
      )}
      <div className="w-full h-full">
        <DashboardMap
          center={[32.0853, 34.7818]}
          zoom={6}
          markers={coordinates.map((coord) => ({
            latitude: coord.latitude,
            longitude: coord.longitude,
            popupText: coord.country || "Unknown Location",
          }))}
        />
      </div>
    </div>
  );
};

export default Dashboard;
