import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/services/user.service";
import { hashPassword } from "@/lib/auth";

export async function POST() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, error: "ADMIN_EMAIL e ADMIN_PASSWORD devem estar definidos" },
        { status: 400 },
      );
    }

    const existing = await findUserByEmail(adminEmail);

    if (existing) {
      return NextResponse.json(
        { success: true, data: { message: "Administrador já existe" } },
      );
    }

    const hashedPassword = await hashPassword(adminPassword);

    await createUser({
      name: "Administrador",
      email: adminEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, data: { message: "Administrador criado com sucesso" } },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
