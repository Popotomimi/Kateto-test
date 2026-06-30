"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getSession, logout } from "@/lib/api/auth";
import KanbanBoard from "@/features/kanban/KanbanBoard";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function verifySession() {
      try {
        const json = await getSession();

        if (!isActive) return;

        if (!json.success) {
          router.replace("/login");
          return;
        }

        setUserEmail(json.data!.email);
      } catch {
        if (isActive) {
          router.replace("/login");
        }
      } finally {
        if (isActive) {
          setAuthLoading(false);
        }
      }
    }

    void verifySession();

    return () => {
      isActive = false;
    };
  }, [router]);

  const handleLogout = useCallback(async () => {
    setLogoutLoading(true);
    await logout();
    toast.success("Logout realizado com sucesso");
    router.replace("/login");
  }, [router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-500">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-amber-500" />
          <p className="text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold tracking-tight text-amber-400">
            Skate<span className="text-zinc-100">Market</span>
            <span className="ml-2 text-sm font-normal text-zinc-500">Dashboard</span>
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">{userEmail}</span>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {logoutLoading ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col p-6">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
