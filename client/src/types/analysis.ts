export interface IHighCasualtyRegions {
  country: string;
  totalevg: number;
}

export interface IEvent {
  latitude: number | null;
  longitude: number | null
  casualties?: number;
  _id: string;
}

export interface ICity {
  city: string;
  events: IEvent[];
  sum?: number;
  _id: string;
}

export interface ICountryData {
  _id: string;
  country: string;
  cities: ICity[];
  totalevg: number;
}
