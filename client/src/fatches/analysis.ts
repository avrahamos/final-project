import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICountryData, IHighCasualtyRegions } from "../types/analysis";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchGetHighCasualtyRegions = createAsyncThunk(
  "analysis/highest-casualty-regions",
  async (_, thunkApi) => {
    try {
      const res = await fetch(
        `${
          apiUrl || "http://localhost:9876"
        }/analysis/highest-casualty-regions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorMessage = await res.text();
        return thunkApi.rejectWithValue(`Failed to fetch: ${errorMessage}`);
      }

      const highCasualtyRegions: IHighCasualtyRegions[] = await res.json();
      return highCasualtyRegions;
    } catch (err) {
      console.error( err);
      return thunkApi.rejectWithValue(
        "Unable to fetch Please try again"
      );
    }
  }
);
//fetchGetHighCasualtyRegionsכדי לעבור למפה בלחיצה על מדינה מהליסט שחוזר מ
export const fetchGetCountryDetails = createAsyncThunk(
  "analysis/:countryName",
  async (countryName, thunkApi) => {
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
        return thunkApi.rejectWithValue(`Failed to fetch: ${errorMessage}`);
      }

      const highCasualtyRegions: ICountryData = await res.json();
      return highCasualtyRegions;
    } catch (err) {
      console.error(err);
      return thunkApi.rejectWithValue("Unable to fetch Please try again");
    }
  }
);