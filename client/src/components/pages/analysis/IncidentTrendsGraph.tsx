import React, { useState } from "react";
import {
  mapIncidentTrendsToGraphData,
  mapYearsToGraphData,
  useIncidentTrends,
} from "../../../hooks/IncidentTrends";
import NavbarToIncident from "../../NavbarToIncident";
import Graph from "../../Graph";

const IncidentTrendsGraph: React.FC = () => {
  const { data, loading, error, loadYear, loadRange, loadLimit } =
    useIncidentTrends();
  const [graphData, setGraphData] = useState<any[]>([]);
  const [xKey, setXKey] = useState<string>("year");

 const handleSelectYear = async (year: number) => {
   await loadYear(year);

   if (Array.isArray(data) && data.length === 1) {
     const graphData = mapIncidentTrendsToGraphData(data[0]); 
     console.log("Mapped graph data:", graphData); 
     setXKey("month");
   } else {
     console.error("Unexpected data format:", data);
   }
 };



  const handleSelectRange = async (startYear: number, endYear: number) => {
    await loadRange(startYear, endYear);
    setGraphData(mapYearsToGraphData(data));
    setXKey("year");
  };

  const handleRecentYears = async (limit: number) => {
    await loadLimit(limit);
    setGraphData(mapYearsToGraphData(data));
    console.log("Data from server:", data);
    setXKey("year");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarToIncident
        onSelectYear={handleSelectYear}
        onSelectRange={handleSelectRange}
        onRecentYears={handleRecentYears}
      />

      <div className="pt-24 p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Graph
            data={graphData}
            xKey={xKey}
            bars={[
              { key: "eventsNum", color: "#8884d8", name: "Number of Events" },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default IncidentTrendsGraph;
