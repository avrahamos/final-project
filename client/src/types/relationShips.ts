export interface ITopGroup {
  _id: string;
  gname: string;
  totalEvents: number;
  regions: IRegion[];
}
export interface IRegion {
  _id: string;
  region: string;
  casualties: number;
}
export interface IGroupByYear {
  gname: string; 
  totalEvents: number; 
}

export interface IRegionDetails {
  region: string;
  casualties: number;
  latitude: number;
  longitude: number;
}
