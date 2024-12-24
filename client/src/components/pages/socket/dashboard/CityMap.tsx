import React from "react";
import { useLocation } from "react-router-dom";
import DashboardMap from "./DashboardMap";
import { ISummaryResult } from "../../../../types/socket";

const CityMap: React.FC = () => {
  const location = useLocation();
  const cityData = location.state as { documents: ISummaryResult[] };
  console.log(JSON.stringify(cityData))
  if (!cityData) {
    return <p>No data available for this city.</p>;
  }

  const events = cityData.documents.map((doc) => ({
    latitude: doc.latitude,
    longitude: doc.longitude,
  }));

  const center: [number, number] = [events[0].latitude, events[0].longitude];

  return (
    <div className="h-screen w-full">
      <DashboardMap center={center} zoom={12} markers={events} />
    </div>
  );
};

export default CityMap;
