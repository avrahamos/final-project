import { IGroupByYear, IRegion, ITopGroup } from "../types/relationShips";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchTopGroups = async (
  regionName: string
): Promise<ITopGroup[]> => {
  try {
    const res = await fetch(
      `${
        apiUrl || "http://localhost:9876"
      }/relationships/top-groups?region=${encodeURIComponent(regionName)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch top groups: ${errorMessage}`);
    }

    const topGroups: ITopGroup[] = await res.json();
    return topGroups;
  } catch (error) {
    console.error("Error fetching top groups:", error);
    throw new Error("Unable to fetch top groups. Please try again.");
  }
};
export const fetchRegionsList = async (): Promise<IRegion[]> => {
  try {
    const res = await fetch(
      `${apiUrl || "http://localhost:9876"}/relationships/regions-list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch regions list: ${errorMessage}`);
    }

    const regions: IRegion[] = await res.json();
    return regions;
  } catch (error) {
    console.error("Error fetching regions list:", error);
    throw new Error("Unable to fetch regions list. Please try again.");
  }
};

export const fetchGroupsByYear = async (
  year: number
): Promise<IGroupByYear[]> => {
  try {
    const response = await fetch(
      `${
        apiUrl || "http://localhost:9876"
      }/relationships/groups-by-year?year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch groups by year: ${errorMessage}`);
    }

    const groups: IGroupByYear[] = await response.json();
    return groups;
  } catch (error) {
    console.error("Error fetching groups by year:", error);
    throw new Error("Unable to fetch groups by year. Please try again.");
  }
};