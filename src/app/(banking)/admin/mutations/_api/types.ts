import type { Role, TransactionDirection, TransactionType } from "@/types/banking";

export type MutationListQuery = {
  q?: string;
  page?: number;
  per_page?: number;
  type?: TransactionType;
  direction?: TransactionDirection;
  customer_id?: string;
  actor_role?: Role;
  date_from?: string;
  date_to?: string;
};
