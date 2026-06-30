"use client";

import { useDraggable } from "@dnd-kit/core";
import type { ILead } from "@/types";

interface KanbanCardProps {
  lead: ILead & { _id: string };
}

export default function KanbanCard({ lead }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead._id,
    data: { status: lead.status },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-xl border bg-white p-4 shadow-sm transition-shadow dark:bg-zinc-800 ${
        isDragging
          ? "border-amber-400 shadow-lg opacity-90"
          : "border-zinc-200 dark:border-zinc-700"
      }`}
    >
      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{lead.name}</p>
      <p className="mt-0.5 text-sm text-zinc-500">{lead.desiredItem}</p>
      <p className="mt-1 text-xs text-zinc-400">{lead.phone}</p>
      <p className="mt-2 text-xs text-zinc-500">
        Vendedor: <span className="font-medium text-amber-500">{lead.seller}</span>
      </p>
    </div>
  );
}
