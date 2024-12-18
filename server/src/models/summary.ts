import { Document, model, Schema } from "mongoose";

export interface ISummary extends Document {
  eventid?: number;
  iyear?: number;
  imonth?: number;
  iday?: number;
  country_txt?: string;
  region_txt?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  attacktype1_txt?: string;
  gname?: string;
  nkill?: number;
  nwound?: number;
  TotalAmount?: number;
}

const SummarySchema = new Schema({
  eventid: { type: Number },
  iyear: { type: Number },
  imonth: { type: Number },
  iday: { type: Number },
  country_txt: { type: String},
  region_txt: { type: String },
  city: { type: String},
  latitude: { type: Number},
  longitude: { type: Number },
  attacktype1_txt: { type: String},
  gname: { type: String },
  nkill: { type: Number },
  nwound: { type: Number},
  TotalAmount: { type: Number},
});
export const Summary = model<ISummary>("Summary", SummarySchema);
