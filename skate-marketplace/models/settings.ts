import mongoose, { Schema, Document } from "mongoose";
import type { ISetting } from "@/types";

export interface ISettingDocument extends ISetting, Document {}

const SettingsSchema = new Schema<ISettingDocument>(
  {
    currentSellerIndex: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const Settings =
  mongoose.models.Settings ?? mongoose.model<ISettingDocument>("Settings", SettingsSchema);
