export interface IAddEventDto {
  date: Date;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  attacktype: string;
  gname: string | "A single hazard";
  nkill: number;
  nwound: number;
  targtype: string;
  weaptype1_txt: string;
  nperps: number | 1;
  summary: string;
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
