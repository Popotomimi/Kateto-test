import mongoose, { Schema, Document } from "mongoose";
import type { IUser } from "@/types";

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? mongoose.model<IUserDocument>("User", UserSchema);
