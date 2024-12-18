import { Schema, model } from "mongoose";

export interface IRegion extends Document{
  region: string; 
  casualties: number; 
}

export interface IOrganization extends Document {
  gname: string; 
  regions: IRegion[]; 
  totalCasualties: number; 
}

const RegionSchema = new Schema<IRegion>({
  region: { type: String, required: true }, 
  casualties: { type: Number, required: true }, 
});

const OrganizationSchema = new Schema<IOrganization>({
  gname: { type: String, required: true }, 
  regions: [RegionSchema], 
  totalCasualties: { type: Number, default: 0 }, 
});

export const Organization = model("Organization", OrganizationSchema);
