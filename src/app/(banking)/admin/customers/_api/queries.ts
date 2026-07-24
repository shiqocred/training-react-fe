"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createAdminCustomer,
  fetchAdminCustomerOptions,
  fetchAdminCustomers,
} from "./fetches";
import type { CustomerListQuery, CustomerPayload } from "./types";

export const adminCustomerQueryKeys = {
  list: (query: CustomerListQuery = {}, token?: string) =>
    ["admin", "customers", query, token] as const,
  options: (token?: string) =>
    ["admin", "customers", "options", token] as const,
};

export function useAdminCustomersQuery(
  query: CustomerListQuery = {},
  token?: string,
) {
  return useQuery({
    queryKey: adminCustomerQueryKeys.list(query, token),
    queryFn: () => fetchAdminCustomers(query, token),
  });
}

export function useAdminCustomerOptionsQuery(token?: string) {
  return useQuery({
    queryKey: adminCustomerQueryKeys.options(token),
    queryFn: () => fetchAdminCustomerOptions(token),
  });
}

export function useCreateAdminCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: CustomerPayload) =>
      createAdminCustomer(payload, token),
  });
}
