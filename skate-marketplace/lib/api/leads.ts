import type { ILead, ILeadInput, LeadStatus, ApiResponse } from "@/types";

type LeadWithId = ILead & { _id: string };

export async function fetchLeads(): Promise<LeadWithId[]> {
  const res = await fetch("/api/leads", {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Falha ao carregar leads");
  }

  const json: ApiResponse<LeadWithId[]> = await res.json();
  return json.success && json.data ? json.data : [];
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<boolean> {
  const res = await fetch(`/api/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  return res.ok;
}

export async function submitLead(
  data: ILeadInput,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json: ApiResponse = await res.json();
    return { success: json.success, error: json.error };
  } catch {
    return { success: false, error: "Erro de conexão. Tente novamente." };
  }
}
