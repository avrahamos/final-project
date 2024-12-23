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
