import { NextResponse } from "next/server";
import { z } from "zod";
import { updateLeadStatus } from "@/services/lead.service";

const patchSchema = z.object({
  status: z.enum(["novo", "contatado", "qualificado", "perdido"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = patchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Status inválido" },
        { status: 400 },
      );
    }

    const lead = await updateLeadStatus(id, result.data.status);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: lead });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
