"use client";

import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { ILead } from "@/types";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  leads: (ILead & { _id: string })[];
}

function KanbanColumn({ id, title, color, leads }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-2xl border bg-zinc-50 p-4 transition-colors dark:bg-zinc-900/50 ${
        isOver
          ? "border-amber-400 bg-amber-50 dark:bg-amber-900/10"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`size-2.5 rounded-full ${color}`} />
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
          {leads.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {leads.map((lead) => (
          <KanbanCard key={lead._id} lead={lead} />
        ))}
      </div>
    </div>
  );
}

export default memo(KanbanColumn);
