import { connectToDatabase } from "@/lib/mongoose";
import { Settings } from "@/models/settings";
import { SELLERS } from "@/constants";
import { initializeSettings } from "@/services/settings.service";
import type { Seller } from "@/types";

export async function assignNextSeller(): Promise<Seller> {
  await connectToDatabase();

  await initializeSettings();

  const old = await Settings.findOneAndUpdate(
    {},
    { $inc: { currentSellerIndex: 1 } },
    { new: false },
  );

  const oldIndex = old?.currentSellerIndex ?? 0;
  return SELLERS[oldIndex % SELLERS.length];
}
