"use client";

import { useEffect, useMemo, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { toast } from "react-toastify";
import type { ILead, LeadStatus } from "@/types";
import KanbanColumn from "./KanbanColumn";

const COLUMNS: { id: LeadStatus; title: string; color: string }[] = [
  { id: "novo", title: "Sem Contato", color: "bg-amber-500" },
  { id: "contatado", title: "Em Contato", color: "bg-blue-500" },
  { id: "perdido", title: "Perdido", color: "bg-red-500" },
  { id: "qualificado", title: "Finalizado", color: "bg-green-500" },
];

const STATUS_LABEL: Record<LeadStatus, string> = {
  novo: "Sem Contato",
  contatado: "Em Contato",
  perdido: "Perdido",
  qualificado: "Finalizado",
};

type LeadWithId = ILead & { _id: string };

async function fetchLeads(): Promise<LeadWithId[]> {
  const response = await fetch("/api/leads", {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar leads");
  }

  const json = await response.json();
  return json.success ? (json.data as LeadWithId[]) : [];
}

function SkeletonBoard() {
  return (
    <div className="grid flex-1 gap-6 lg:grid-cols-4">
      {COLUMNS.map((col) => (
        <div key={col.id} className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="mb-4 h-5 w-24 animate-pulse rounded bg-zinc-800" />
          {[1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-zinc-800" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function KanbanBoard() {
  const [leads, setLeads] = useState<LeadWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadLeads() {
      try {
        const data = await fetchLeads();
        if (isActive) {
          setLeads(data);
        }
      } catch {
        if (isActive) {
          setLeads([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void loadLeads();

    return () => {
      isActive = false;
    };
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const newStatus = over.id as LeadStatus;
    const leadId = String(active.id);

    const previous = leads;

    setLeads((prev) =>
      prev.map((lead) => (lead._id === leadId ? { ...lead, status: newStatus } : lead)),
    );

    toast.success(`Lead movido para ${STATUS_LABEL[newStatus]}`);

    void fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    }).then(async (res) => {
      if (!res.ok) {
        setLeads(previous);
        toast.error("Erro ao atualizar status");
      }
    });
  }

  const grouped = useMemo(
    () =>
      COLUMNS.map((col) => ({
        ...col,
        leads: leads.filter((lead) => lead.status === col.id),
      })),
    [leads],
  );

  if (loading) {
    return <SkeletonBoard />;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid flex-1 gap-6 lg:grid-cols-4">
        {grouped.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            color={col.color}
            leads={col.leads}
          />
        ))}
      </div>
    </DndContext>
  );
}
