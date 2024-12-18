import { Document, model, Schema } from "mongoose";

export interface IMonth {
  month: number;
  eventsNum: number;
}

export interface IYear extends Document {
  year: number;
  months: IMonth[];
  totalEvents: number;
}

const MonthSchema = new Schema<IMonth>({
  month: { type: Number, required: true },
  eventsNum: { type: Number, required: true },
});

const YearSchema = new Schema<IYear>({
  year: { type: Number, required: true },
  months: [MonthSchema],
  totalEvents: { type: Number, default: 0 },
});

export const Year = model<IYear>("Year", YearSchema);
