"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCustomerMutationDetail } from "./fetches";

export const customerMutationDetailQueryKeys = {
  detail: (id: string, token?: string) => ["customer", "mutations", id, token] as const,
};

export function useCustomerMutationDetailQuery(id: string, token?: string) {
  return useQuery({
    queryKey: customerMutationDetailQueryKeys.detail(id, token),
    queryFn: () => fetchCustomerMutationDetail(id, token),
    enabled: id !== "",
  });
}
