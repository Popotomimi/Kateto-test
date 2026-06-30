import type { Seller, LeadStatus } from "@/types";

export const SELLERS: Seller[] = ["Marcelo", "Rafael", "Renato", "Pedro", "Leonardo"];

export const LEAD_STATUSES: LeadStatus[] = ["novo", "contatado", "qualificado", "perdido"];

export const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
} as const;

export const API_ROUTES = {
  AUTH_LOGIN: "/api/auth/login",
  LEADS: "/api/leads",
} as const;

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";
