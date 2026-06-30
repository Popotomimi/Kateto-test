export type LeadStatus = "novo" | "contatado" | "qualificado" | "perdido";

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILead {
  name: string;
  desiredItem: string;
  phone: string;
  seller: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISetting {
  currentSellerIndex: number;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILeadInput {
  name: string;
  desiredItem: string;
  phone: string;
}

export type Seller = "Marcelo" | "Rafael" | "Renato" | "Pedro" | "Leonardo";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};
