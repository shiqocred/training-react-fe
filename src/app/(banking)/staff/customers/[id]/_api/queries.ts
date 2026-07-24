"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteStaffCustomer,
  depositStaffCustomer,
  fetchStaffCustomerDetail,
  transferStaffCustomer,
  updateStaffCustomer,
  withdrawStaffCustomer,
} from "./fetches";
import type { CustomerPayload, TransactionAmountPayload, TransferPayload } from "./types";

export const staffCustomerDetailQueryKeys = {
  detail: (id: string, token?: string) => ["staff", "customers", id, token] as const,
};

export function useStaffCustomerDetailQuery(id: string, token?: string) {
  return useQuery({
    queryKey: staffCustomerDetailQueryKeys.detail(id, token),
    queryFn: () => fetchStaffCustomerDetail(id, token),
    enabled: id !== "",
  });
}

export function useUpdateStaffCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CustomerPayload }) =>
      updateStaffCustomer(id, payload, token),
  });
}

export function useDeleteStaffCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: (id: string) => deleteStaffCustomer(id, token),
  });
}

export function useDepositStaffCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransactionAmountPayload }) =>
      depositStaffCustomer(id, payload, token),
  });
}

export function useWithdrawStaffCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransactionAmountPayload }) =>
      withdrawStaffCustomer(id, payload, token),
  });
}

export function useTransferStaffCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransferPayload }) =>
      transferStaffCustomer(id, payload, token),
  });
}
