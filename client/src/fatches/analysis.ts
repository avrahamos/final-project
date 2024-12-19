import { ICountryData, IHighCasualtyRegions } from "../types/analysis";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchGetHighCasualtyRegions = async (): Promise<
  IHighCasualtyRegions[]
> => {
  try {
    const res = await fetch(
      `${apiUrl || "http://localhost:9876"}/analysis/highest-casualty-regions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch: ${errorMessage}`);
    }

    const highCasualtyRegions: IHighCasualtyRegions[] = await res.json();
    return highCasualtyRegions;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to fetch. Please try again.");
  }
};

//fetchGetHighCasualtyRegionsכדי לעבור למפה בלחיצה על מדינה מהליסט שחוזר מ
export const fetchGetCountryDetails = async (
  countryName: string
): Promise<ICountryData> => {
  try {
    const res = await fetch(
      `${apiUrl || "http://localhost:9876"}/analysis/${countryName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`failed to fetch ${errorMessage}`);
    }

    const countryDetails: ICountryData = await res.json();
    return countryDetails;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to fetch Please try again");
  }
};