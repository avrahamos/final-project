import { Document, model, Schema } from "mongoose";

export interface ICountry extends Document {
  country_txt: {
    city: {
      event: {
        latitude: number;
        longitude: number;
        Casualties: number;
      };
      evg: number;
    };
    totalevg: number;
  };
}

const CountrySchema = new Schema({
  country_txt: {
    city: {
      event: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        Casualties: { type: Number, required: false },
      },
      evg: { type: Number},
    },
    totalevg: { type: Number},
  },
});

export const Country = model<ICountry>("Country", CountrySchema);