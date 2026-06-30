import { connectToDatabase } from "@/lib/mongoose";
import { Settings } from "@/models/settings";

export async function getSettings() {
  await connectToDatabase();
  return Settings.findOne();
}

export async function initializeSettings() {
  await connectToDatabase();

  const existing = await Settings.findOne();

  if (existing) {
    return existing;
  }

  return Settings.create({ currentSellerIndex: 0 });
}

export async function updateSellerIndex(index: number) {
  await connectToDatabase();
  return Settings.findOneAndUpdate({}, { currentSellerIndex: index }, { new: true });
}
