import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../../../css/dashboardMap.css";

interface MarkerData {
  latitude: number;
  longitude: number;
  popupText?: string;
}

interface DashboardMapProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
}

const ResetView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const DashboardMap: React.FC<DashboardMapProps> = ({
  center,
  zoom,
  markers,
}) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
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
  );
};

export default DashboardMap;
