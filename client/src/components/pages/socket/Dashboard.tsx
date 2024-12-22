import React, { useEffect, useState } from "react";
import DashboardMap from "./DashboardMap";
import {
  disconnectListeners,
  fetchAllCoordinates,
  onCoordinatesList,
} from "../../../socket/dashboard";
import { connectSocket } from "../../../socket/appIo";

interface Coordinate {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  region?: string;
}

const Dashboard: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

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

  return (
    <div className="w-full h-screen border border-gray-300 rounded-md shadow-md flex items-center justify-center p-4">
      <div className="w-full h-full max-w-7xl max-h-screen bg-white rounded-md shadow-lg">
        <DashboardMap
          center={[32.0853, 34.7818]} 
          zoom={6} 
          markers={coordinates.map((coord) => ({
            latitude: coord.latitude,
            longitude: coord.longitude,
            popupText:
            coord.country || "unknown Location",
          }))}
        />
      </div>
    </div>
  );
};

export default Dashboard;
