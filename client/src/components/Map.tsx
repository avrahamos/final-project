import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: { latitude: number; longitude: number; popupText?: string | number}[];
}

const Map: React.FC<MapProps> = ({ center, zoom, markers }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.latitude, marker.longitude]}>
          {marker.popupText && <Popup>{marker.popupText}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
