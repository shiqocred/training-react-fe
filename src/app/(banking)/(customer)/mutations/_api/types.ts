import type {
  Role,
  TransactionDirection,
  TransactionType,
} from "@/types/banking";

export type CustomerMutationListQuery = {
  q?: string;
  page?: number;
  per_page?: number;
  type?: TransactionType;
  direction?: TransactionDirection;
  actor_role?: Role;
  date_from?: string;
  date_to?: string;
};

export type TransactionAmountPayload = {
  amount: string;
  note?: string | null;
};

export type TransferPayload = TransactionAmountPayload & {
  to_customer_id: string;
};
