
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
  region?: string;
  latitude: number;
  longitude: number;
}
