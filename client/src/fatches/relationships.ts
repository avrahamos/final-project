import { IRegion, ITopGroup } from "../types/relationShips";

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