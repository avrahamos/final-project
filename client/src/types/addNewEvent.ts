import { IUpdateEventDto } from "./socket";

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
export const FIELD_LABELS: { [key in keyof IUpdateEventDto]?: string } = {
  country_txt: "Country",
  region_txt: "Region",
  city: "City",
  latitude: "Latitude",
  longitude: "Longitude",
  attacktype1_txt: "Attack Type",
  gname: "Group Name",
  nkill: "Number of Killed",
  nwound: "Number of Wounded",
  weaptype1_txt: "Weapon Type",
  summary: "Summary",
};
