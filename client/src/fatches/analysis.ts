import { ICountryData, IDeadliestAttackTypes, IHighCasualtyRegions, IIncidentTrends } from "../types/analysis";

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


export const fetchGetDeadliestAttackTypes = async (): Promise<
  IDeadliestAttackTypes[]
> => {
  try {
    const res = await fetch(
      `${apiUrl || "http://localhost:9876"}/analysis/deadliest-attack-types`,
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

    const deadliestAttackTypes: IDeadliestAttackTypes[] = await res.json();
    return deadliestAttackTypes;
  } catch (err) {
    console.error(err);
    throw new Error(
      "unable to fetch please try again"
    );
  }
};

interface FetchIncidentTrendsParams {
  type: "singleYear" | "range" | "recent";
  year?: number;
  startYear?: number;
  endYear?: number;
  limit?: number;
}

export const fetchIncidentTrends = async (
  params: FetchIncidentTrendsParams
): Promise<IIncidentTrends[]> => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append("type", params.type);
    if (params.year) queryParams.append("year", params.year.toString());
    if (params.startYear)
      queryParams.append("startYear", params.startYear.toString());
    if (params.endYear)
      queryParams.append("endYear", params.endYear.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    const res = await fetch(
      `${
        apiUrl || "http://localhost:9876"
      }/analysis/incident-trends?${queryParams.toString()}`,
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

    const incidentTrends: IIncidentTrends[] = await res.json();
    return incidentTrends;
  } catch (err) {
    console.error(err);
    throw new Error("unable to fetch please try again");
  }
};