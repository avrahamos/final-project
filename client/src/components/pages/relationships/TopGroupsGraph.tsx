import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchTopGroups } from "../../../fatches/relationships";
import Graph from "../../Graph";

interface ITopGroup {
  gname: string;
  totalEvents: number;
}

const TopGroupsGraph: React.FC = () => {
  const location = useLocation();
  const { regionName } = location.state || {}; 
  const [data, setData] = useState<ITopGroup[]>([]);
  const [visibleData, setVisibleData] = useState<ITopGroup[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchTopGroups(regionName); 
        setData(result);
        setVisibleData(result.slice(0, 5)); 
      } catch (error) {
        console.error("Failed to fetch top groups:", error);
      } finally {
        setLoading(false);
      }
    };

    if (regionName) {
      fetchData();
    }
  }, [regionName]);

  const handleShowAll = () => {
    setShowAll(true);
    setVisibleData(data); 
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!regionName) return <p className="text-red-500">Region not selected.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Top Groups in {regionName}</h1>
      <Graph
        data={visibleData}
        xKey="gname"
        bars={[{ key: "totalEvents", color: "#8884d8", name: "Total Events" }]}
      />
      {!showAll && data.length > 5 && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={handleShowAll}
        >
          Show All
        </button>
      )}
    </div>
  );
};

export default TopGroupsGraph;
