import { Document, model, Schema } from "mongoose";

export interface IYear extends Document {
  iyear: {
    month: {
      imonth: {
        events: number;
      };
    };
    total: number;
  };
}

const IYearSchema = new Schema({
  iyear: {
    month: {
      imonth: {
        events: { type: Number, required: false },
      },
    },
    Total: { type: Number, required: false },
  },
});
export const IYear = model<IYear>("IYear", IYearSchema);