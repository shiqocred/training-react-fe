"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  depositCustomer,
  fetchCustomerMutations,
  transferCustomer,
  withdrawCustomer,
} from "./fetches";
import type {
  CustomerMutationListQuery,
  TransactionAmountPayload,
  TransferPayload,
} from "./types";

export const customerMutationQueryKeys = {
  list: (query: CustomerMutationListQuery = {}, token?: string) =>
    ["customer", "mutations", query, token] as const,
};

export function useCustomerMutationsQuery(
  query: CustomerMutationListQuery = {},
  token?: string,
) {
  return useQuery({
    queryKey: customerMutationQueryKeys.list(query, token),
    queryFn: () => fetchCustomerMutations(query, token),
  });
}

export function useDepositCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: TransactionAmountPayload) =>
      depositCustomer(payload, token),
  });
}

export function useWithdrawCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: TransactionAmountPayload) =>
      withdrawCustomer(payload, token),
  });
}

export function useTransferCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: TransferPayload) => transferCustomer(payload, token),
  });
}
