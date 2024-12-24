import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardMap from "./DashboardMap";
import { ISummaryResult } from "../../../../types/socket";
import Details from "../crud/Details";

const CityMap: React.FC = () => {
  const location = useLocation();
  const cityData = location.state as { documents: ISummaryResult[] };
  const [selectedEvent, setSelectedEvent] = useState<ISummaryResult | null>(
    null
  );

  if (!cityData) {
    return <p>No data available for this city.</p>;
  }

  const events = cityData.documents.map((doc) => ({
    latitude: doc.latitude,
    longitude: doc.longitude,
    onClick: () => setSelectedEvent(doc), 
  }));

  const center: [number, number] = [events[0].latitude, events[0].longitude];

  const handleDelete = () => {
    console.log("Deleted event:", selectedEvent);
    setSelectedEvent(null);
  };

  const handleUpdate = (updatedEvent: any) => {
    console.log("Updated event:", updatedEvent);
    setSelectedEvent(null);
  };

  return (
    <div className="h-screen w-full relative">
      <DashboardMap center={center} zoom={12} markers={events} />

      {selectedEvent && (
        <div className="absolute top-10 left-10 z-50 bg-white shadow-lg rounded-lg p-4 w-96">
          <Details
            eventDetails={selectedEvent}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default CityMap;
