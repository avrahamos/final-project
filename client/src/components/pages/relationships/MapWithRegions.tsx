import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IRegionDetails } from "../../../types/relationShips";
import { fetchOrganizationDetails } from "../../../fatches/relationships";

const MapWithRegions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organizationName } = location.state || {}; 
  const [regions, setRegions] = useState<IRegionDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!organizationName) {
        setError("Organization name is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchOrganizationDetails(organizationName);
        if (data.length === 0) {
          setError(
            `No regions found for the organization: ${organizationName}`
          );
        } else {
          setRegions(data);
        }
      } catch (err) {
        setError("Failed to fetch regions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizationName]);

  const handleViewMap = () => {
    const validRegions = regions.filter(
      (region) => region.latitude !== null && region.longitude !== null
    );

    if (validRegions.length > 0) {
      const mapProps = {
        center: [validRegions[0].latitude, validRegions[0].longitude],
        zoom: 5,
        markers: validRegions.map((region) => ({
          latitude: region.latitude,
          longitude: region.longitude,
          popupText: `${region.region}: ${region.casualties} casualties`,
        })),
      };

      navigate("/map", { state: mapProps });
    } else {
      setError("No valid coordinates available for this organization.");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Regions for {organizationName}
      </h1>
      <button
        onClick={handleViewMap}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View on Map
      </button>
    </div>
  );
};

export default MapWithRegions;
