import { Document, Schema, model } from "mongoose";

export interface IEvent extends Document{
  latitude?: number; 
  longitude?: number; 
  casualties?: number; 
}

export interface ICity extends Document {
  city: string;
  events: IEvent[]; 
  sum: number; 
}

export interface ICountry extends Document {
  country: string;
  cities: ICity[];
  totalevg: number;
}

const EventSchema = new Schema({
  latitude: { type: Number, required: false }, 
  longitude: { type: Number, required: false }, 
  casualties: { type: Number, required: false }, 
});

const CitySchema = new Schema({
  city: { type: String, required: true }, 
  events: [EventSchema],
  sum: { type: Number, required: true }, 
});

const CountrySchema = new Schema({
  country: { type: String, required: true }, 
  cities: [CitySchema], 
  totalevg: { type: Number, required: true }, 
});

export const Country = model("Country", CountrySchema);
