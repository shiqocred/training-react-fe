"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteAdminCustomer,
  depositAdminCustomer,
  fetchAdminCustomerDetail,
  transferAdminCustomer,
  updateAdminCustomer,
  withdrawAdminCustomer,
} from "./fetches";
import type { CustomerPayload, TransactionAmountPayload, TransferPayload } from "./types";

export const adminCustomerDetailQueryKeys = {
  detail: (id: string, token?: string) => ["admin", "customers", id, token] as const,
};

export function useAdminCustomerDetailQuery(id: string, token?: string) {
  return useQuery({
    queryKey: adminCustomerDetailQueryKeys.detail(id, token),
    queryFn: () => fetchAdminCustomerDetail(id, token),
    enabled: id !== "",
  });
}

export function useUpdateAdminCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CustomerPayload }) =>
      updateAdminCustomer(id, payload, token),
  });
}

export function useDeleteAdminCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: (id: string) => deleteAdminCustomer(id, token),
  });
}

export function useDepositAdminCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransactionAmountPayload }) =>
      depositAdminCustomer(id, payload, token),
  });
}

export function useWithdrawAdminCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransactionAmountPayload }) =>
      withdrawAdminCustomer(id, payload, token),
  });
}

export function useTransferAdminCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransferPayload }) =>
      transferAdminCustomer(id, payload, token),
  });
}
