import React, { useEffect, useState } from "react";
import { IDeadliestAttackTypes } from "../../../types/analysis";
import { fetchGetDeadliestAttackTypes } from "../../../fatches/analysis";
import Graph from "../../Graph";

const DeadliestAttackGraph: React.FC = () => {
  const [data, setData] = useState<IDeadliestAttackTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGetDeadliestAttackTypes();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Deadliest Attack Types
      </h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <Graph data={data} />
      </div>
    </div>
  );
};

export default DeadliestAttackGraph;
