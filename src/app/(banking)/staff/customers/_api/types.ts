import type { CustomerStatus } from "@/types/banking";

export type CustomerListQuery = {
  q?: string;
  page?: number;
  per_page?: number;
  status?: CustomerStatus;
};

export type CustomerPayload = {
  name: string;
  email: string;
  password?: string;
  status?: CustomerStatus;
};

export type CustomerOptionItem = {
  id: string;
  name: string;
  email: string;
  account_number: string;
};
