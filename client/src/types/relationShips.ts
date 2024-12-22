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
