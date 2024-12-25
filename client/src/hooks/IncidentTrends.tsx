import { useState } from "react";
import { IIncidentTrends, IYear } from "../types/analysis";
import { fetchIncidentTrends } from "../fatches/analysis";

interface UseIncidentTrends {
  data: IIncidentTrends[];
  loading?: boolean;
  error?: string | null;
  loadYear: (year: number) => Promise<void>;
  loadRange: (startYear: number, endYear: number) => Promise<void>;
  loadLimit: (limit: number) => Promise<void>;
}

export const useIncidentTrends = (): UseIncidentTrends => {
  const [data, setData] = useState<IIncidentTrends[]>([]);

  const fetchData = async (
    type: "singleYear" | "range" | "recent",
    params: any
  ) => {
    try {
      const result = await fetchIncidentTrends({ type, ...params });
      setData(Array.isArray(result) ? result : [result]);
    } catch (err) {
      (err as Error).message;
      throw err;
    } finally {
      false;
    }
  };
  return {
    data,
    loadYear: (year: number) => fetchData("singleYear", { year }),
    loadRange: (startYear: number, endYear: number) =>
      fetchData("range", { startYear, endYear }),
    loadLimit: (limit: number) => fetchData("recent", { limit }),
  };
};

export const mapIncidentTrendsToGraphData = (
  incidentTrend: IYear
): { month: string; eventsNum: number }[] => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return incidentTrend.months.map((monthData) => ({
    month: monthNames[monthData.month - 1],
    eventsNum: monthData.eventsNum,
  }));
};


export const mapYearsToGraphData = (
  yearsData: {
    year: number;
    totalEvents: number;
  }[]
): { year: number; eventsNum: number }[] => {
  return yearsData.map((yearData) => ({
    year: yearData.year,
    eventsNum: yearData.totalEvents,
  }));
};
