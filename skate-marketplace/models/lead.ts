import mongoose, { Schema, Document } from "mongoose";
import type { ILead } from "@/types";
import { SELLERS, LEAD_STATUSES } from "@/constants";

export interface ILeadDocument extends ILead, Document {}

const LeadSchema = new Schema<ILeadDocument>(
  {
    name: { type: String, required: true },
    desiredItem: { type: String, required: true },
    phone: { type: String, required: true },
    seller: { type: String, required: true, enum: SELLERS },
    status: { type: String, required: true, enum: LEAD_STATUSES, default: "novo" },
  },
  { timestamps: true },
);

export const Lead = mongoose.models.Lead ?? mongoose.model<ILeadDocument>("Lead", LeadSchema);
