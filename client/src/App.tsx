import React from "react";
import Map from "./components/Map";

const App: React.FC = () => {
  const center: [number, number] = [31.771599, 35.2034];
  const zoom = 13;
  const markers = [
    { latitude: 31.771599, longitude: 35.2034, popupText: "Marker 1" },
    { latitude: 31.771599, longitude: 35.2034, popupText: "Marker 2" },
  ];

  return (
    <div className="h-screen w-full bg-white">
      <Map center={center} zoom={zoom} markers={markers} />
    </div>
  );
};

export default App;
