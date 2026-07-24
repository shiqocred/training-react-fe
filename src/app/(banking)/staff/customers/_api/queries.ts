"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createStaffCustomer,
  fetchStaffCustomerOptions,
  fetchStaffCustomers,
} from "./fetches";
import type { CustomerListQuery, CustomerPayload } from "./types";

export const staffCustomerQueryKeys = {
  list: (query: CustomerListQuery = {}, token?: string) =>
    ["staff", "customers", query, token] as const,
  options: (token?: string) =>
    ["staff", "customers", "options", token] as const,
};

export function useStaffCustomersQuery(
  query: CustomerListQuery = {},
  token?: string,
) {
  return useQuery({
    queryKey: staffCustomerQueryKeys.list(query, token),
    queryFn: () => fetchStaffCustomers(query, token),
  });
}

export function useStaffCustomerOptionsQuery(token?: string) {
  return useQuery({
    queryKey: staffCustomerQueryKeys.options(token),
    queryFn: () => fetchStaffCustomerOptions(token),
  });
}

export function useCreateStaffCustomerMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: CustomerPayload) =>
      createStaffCustomer(payload, token),
  });
}
