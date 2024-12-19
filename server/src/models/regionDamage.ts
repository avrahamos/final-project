import { Document, model, Schema } from "mongoose";

export interface IRegionDamage extends Document {
  region: string;
  casualties: number;
  latitude: number;
  longitude: number;
}

export interface IOrganizationImpact extends Document {
  gname: string;
  regions: IRegionDamage[];
}

const RegionDamageSchema = new Schema<IRegionDamage>({
  region: { type: String, required: true },
  casualties: { type: Number, default: 0 },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const OrganizationImpactSchema = new Schema<IOrganizationImpact>({
  gname: { type: String, required: true },
  regions: [RegionDamageSchema],
});

export const OrganizationImpact = model<IOrganizationImpact>(
  "OrganizationImpact",
  OrganizationImpactSchema
);
