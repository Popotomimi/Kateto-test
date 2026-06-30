import type { ApiResponse } from "@/types";

interface SessionData {
  email: string;
}

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const json: ApiResponse = await res.json();
    return { success: json.success, error: json.error };
  } catch {
    return { success: false, error: "Erro de conexão" };
  }
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

export async function getSession(): Promise<ApiResponse<SessionData>> {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  return res.json() as Promise<ApiResponse<SessionData>>;
}
