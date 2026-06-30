"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const leadFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  desiredItem: z.string().min(3, "Descreva o item que você deseja"),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido. Use (XX) XXXXX-XXXX"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export default function LeadForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  async function onSubmit(data: LeadFormData) {
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!json.success) {
        toast.error(json.error ?? "Erro ao enviar lead");
        setLoading(false);
        return;
      }

      toast.success("Lead enviado com sucesso!");
      reset();
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-8 text-left shadow-xl backdrop-blur-sm"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="desiredItem" className="block text-sm font-medium text-zinc-300">
            O que você deseja?
          </label>
          <input
            id="desiredItem"
            type="text"
            placeholder="Ex: Longboard para cruise, Skate Street para manobras..."
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            {...register("desiredItem")}
          />
          {errors.desiredItem && (
            <p className="mt-1 text-xs text-red-400">{errors.desiredItem.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(11) 99999-8888"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-900 transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Quero Receber Contato"}
      </button>
    </form>
  );
}
