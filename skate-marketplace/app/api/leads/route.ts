import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/services/lead.service";

const leadSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  desiredItem: z.string().min(3, "Descreva o item que você deseja"),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .regex(
      /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
      "Telefone inválido. Use (XX) XXXXX-XXXX",
    ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = leadSchema.safeParse(body);

    if (!result.success) {
      const error = result.error.issues[0]?.message ?? "Dados inválidos";
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    const lead = await createLead(result.data);

    return NextResponse.json(
      { success: true, data: lead },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
