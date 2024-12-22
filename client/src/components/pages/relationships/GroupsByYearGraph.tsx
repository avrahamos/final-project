import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IGroupByYear } from "../../../types/relationShips";
import { fetchGroupsByYear } from "../../../fatches/relationships";
import Graph from "../../Graph";

const GroupsByYearGraph: React.FC = () => {
  const location = useLocation();
  const { year } = location.state || {};
  const [data, setData] = useState<IGroupByYear[]>([]);
  const [visibleData, setVisibleData] = useState<IGroupByYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!year) {
        setError("Year is missing. Redirecting...");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await fetchGroupsByYear(year); 
        setData(result);
        setVisibleData(result.slice(0, 5)); 
      } catch (err) {
        setError("failed to fetch groups by year");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  const handleShowAll = () => {
    setShowAll(true);
    setVisibleData(data); 
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Top Groups in {year}</h1>
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

export default GroupsByYearGraph;
