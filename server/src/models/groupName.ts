import { Schema, model } from "mongoose";

export interface IRegion extends Document{
  region: string; 
  casualties: number; 
}

export interface IOrganization extends Document {
  gname: string;
  regions: IRegion[];
  totalCasualties: number;
  years: IYear[]
}

export interface IYear extends Document {
  year: number;
  events: number;
}

const YearSchema = new Schema<IYear>({
  year: { type: Number, required: true }, 
  events: { type: Number, required: true }, 
});

const RegionSchema = new Schema<IRegion>({
  region: { type: String, required: true }, 
  casualties: { type: Number}, 
});

const OrganizationSchema = new Schema<IOrganization>({
  gname: { type: String, required: true },
  regions: [RegionSchema],
  totalCasualties: { type: Number, default: 0 },
  years: [YearSchema],
});

export const Organization = model("Organization", OrganizationSchema);
