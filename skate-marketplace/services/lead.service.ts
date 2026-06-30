import { connectToDatabase } from "@/lib/mongoose";
import { Lead } from "@/models/lead";
import type { ILeadInput, LeadStatus } from "@/types";

export async function createLead(data: ILeadInput & { seller: string }) {
  await connectToDatabase();
  return Lead.create(data);
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
