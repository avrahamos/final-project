import { Document, model, Schema } from "mongoose";

 interface ICoordinates extends Document {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  region?: string;
}


const CoordinatesSchema = new Schema<ICoordinates>({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  city: { type: String }, 
  country: { type: String },
  region: { type: String },
});

export const Coordinates = model<ICoordinates>(
  "Coordinates",
  CoordinatesSchema
);
