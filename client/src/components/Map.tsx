import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./NavBar";

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: {
    latitude: number;
    longitude: number;
    popupText?: string | number;
  }[];
}

const ResetView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const Map: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapProps = location.state as MapProps;

  if (!mapProps) {
    console.error("No mapProps found in location.state");
    return <p>No map data available.</p>;
  }

  const { center, zoom, markers } = mapProps;

  const handleSelectYear = (year: number) => {
    navigate("/groups-by-year", { state: { year } });
  };

  const handleSelectOrganization = (organization: string) => {
    navigate("/map-with-regions", {
      state: { organizationName: organization },
    });
  };

  return (
    <div className="relative">
      <Navbar
        onSelectYear={handleSelectYear}
        onSelectOrganization={handleSelectOrganization}
      />

      <div
        className="pt-16"
        style={{ height: "calc(100vh - 64px)", width: "100%" }}
      >
        <MapContainer
          center={center || [32.0853, 34.7818]}
          zoom={zoom || 13}
          style={{ height: "100%", width: "100%" }}
        >
          <ResetView center={center} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.latitude, marker.longitude]}>
              {marker.popupText && <Popup>{marker.popupText}</Popup>}
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
