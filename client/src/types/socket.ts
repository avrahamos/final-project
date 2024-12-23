
export interface ICoordinate {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  region?: string;
}


export interface ISearchResult {
  city?: string;
  country?: string;
  latitude: number;
  longitude: number;
}

export interface CityData {
  city: string;
  latitude: number;
  longitude: number;
}

export interface CountryData {
  country: string;
  cities: CityData[];
}
