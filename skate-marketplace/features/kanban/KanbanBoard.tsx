"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { toast } from "react-toastify";
import type { ILead, LeadStatus } from "@/types";
import { fetchLeads, updateLeadStatus } from "@/lib/api/leads";
import KanbanColumn from "./KanbanColumn";

const POLL_INTERVAL = 15_000;

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
  const isDragging = useRef(false);

  useEffect(() => {
    const isActive = { current: true };

    async function loadLeads() {
      try {
        const data = await fetchLeads();
        if (isActive.current) {
          setLeads(data);
        }
      } catch {
        if (isActive.current) {
          setLeads([]);
        }
      } finally {
        if (isActive.current) {
          setLoading(false);
        }
      }
    }

    void loadLeads();

    const interval = setInterval(() => {
      if (!isDragging.current) {
        void loadLeads();
      }
    }, POLL_INTERVAL);

    return () => {
      isActive.current = false;
      clearInterval(interval);
    };
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      isDragging.current = true;
      const { active, over } = event;

      if (!over || active.id === over.id) {
        isDragging.current = false;
        return;
      }

      const newStatus = over.id as LeadStatus;
      const leadId = String(active.id);

      const previous = leads;

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === leadId ? { ...lead, status: newStatus } : lead,
        ),
      );

      toast.success(`Lead movido para ${STATUS_LABEL[newStatus]}`);

      void updateLeadStatus(leadId, newStatus).then((ok) => {
        if (!ok) {
          setLeads(previous);
          toast.error("Erro ao atualizar status");
        }
        isDragging.current = false;
      });
    },
    [leads],
  );

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
