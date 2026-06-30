import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/user";
import type { IUser } from "@/types";

export async function createUser(data: Pick<IUser, "name" | "email" | "password">) {
  await connectToDatabase();
  return User.create(data);
}

export async function findUserByEmail(email: string) {
  await connectToDatabase();
  return User.findOne({ email });
}
