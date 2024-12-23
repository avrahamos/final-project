import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../../../css/dashboardMap.css";
import AddEvent from "../crud/AddEvent";

interface MarkerData {
  latitude: number;
  longitude: number;
  popupText?: string;
}

interface DashboardMapProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
  onMapClick?: (latitude: number, longitude: number) => void;
}

const ResetView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const MapClickHandler: React.FC<{
  onMapClick?: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  useMapEvents({
    dblclick: (e) => {
      if (onMapClick) {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      }
    },
  });
  return null;
};

const DashboardMap: React.FC<DashboardMapProps> = ({
  center,
  zoom,
  markers,

}) => {
  const [formVisible, setFormVisible] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState<
    [number, number] | null
  >(null);

  const handleMapDoubleClick = (lat: number, lng: number) => {
    setClickedCoordinates([lat, lng]);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setClickedCoordinates(null);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <MapClickHandler onMapClick={handleMapDoubleClick} />
        <ResetView center={center} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.latitude, marker.longitude]}>
            {marker.popupText && <Popup>{marker.popupText}</Popup>}
          </Marker>
        ))}
      </MapContainer>

      {formVisible && clickedCoordinates && (
        <div className="fixed inset-0 flex items-start justify-center pt-20 bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
          <AddEvent
            latitude={clickedCoordinates[0]}
            longitude={clickedCoordinates[1]}
            onClose={closeForm}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardMap;
