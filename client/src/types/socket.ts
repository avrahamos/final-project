
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

export interface ISummaryResult{
  _id?:string
  eventid?: number;
  iyear?: number;
  imonth?: number;
  iday?: number;
  country_txt?: string;
  region_txt?: string;
  city: string;
  latitude: number;
  longitude: number;
  attacktype1_txt?: string;
  gname?: string;
  nkill?: number;
  nwound?: number;
  TotalAmount?: number;
  targtype1_txt?: string;
  target1?: string;
  weaptype1_txt?: string;
  nperps?: number;
  summary?: string;
}
export interface IUpdateEventDto {
  country_txt?: string;
  region_txt?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  attacktype1_txt?: string;
  gname?: string;
  nkill?: number;
  nwound?: number;
  weaptype1_txt?: string;
  summary?: string;
}
