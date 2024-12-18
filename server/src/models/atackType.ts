import { Document, model, Schema } from "mongoose";

export interface IAttackType extends Document {
  attacktype: string;
  nkill: number;
  nwound: number;
  totalAmount: number;
}

const AttackTypeSchema = new Schema({
  attacktype: { type: String, required: true },
  nkill: { type: Number, default: 0 },
  nwound: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
});

export const AttackType = model<IAttackType>("AttackType", AttackTypeSchema);
