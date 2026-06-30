import { connectToDatabase } from "@/lib/mongoose";
import { Lead } from "@/models/lead";
import type { ILeadInput, LeadStatus } from "@/types";
import { assignNextSeller } from "@/services/round-robin.service";

export async function createLead(data: ILeadInput) {
  await connectToDatabase();

  const seller = await assignNextSeller();

  return Lead.create({ ...data, seller });
}

export async function findLeads() {
  await connectToDatabase();
  return Lead.find().sort({ createdAt: -1 });
}

export async function findLeadById(id: string) {
  await connectToDatabase();
  return Lead.findById(id);
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await connectToDatabase();
  return Lead.findByIdAndUpdate(id, { status }, { new: true });
}
