import type { CustomerStatus } from "@/types/banking";

export type AdminCustomerDetailParams = { id: string };

export type CustomerPayload = {
  name: string;
  email: string;
  password?: string;
  status?: CustomerStatus;
};

export type TransactionAmountPayload = {
  amount: string;
  note?: string | null;
};

export type TransferPayload = TransactionAmountPayload & {
  to_customer_id: string;
};
