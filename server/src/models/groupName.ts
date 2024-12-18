import { Document, model, Schema } from "mongoose";

export interface IGname extends Document {
  gname: {
    Region: {
      eventLocation: {
        latitude: number;
        longitude: number;
        Casualties: number;
      };
    };
    totalCasualties: number;
    TotalAmount: number;
  };
}

const GnameSchema = new Schema({
  gname: {
    Region: {
      eventLocation: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        Casualties: { type: Number, required: false },
      },
    },
    totalCasualties: { type: Number, required: false },
    TotalAmount: { type: Number, required: false },
  },
});
export const Gname = model<IGname>("Gname", GnameSchema);
