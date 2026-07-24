"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAdminMutationDetail } from "./fetches";

export const adminMutationDetailQueryKeys = {
  detail: (id: string, token?: string) => ["admin", "mutations", id, token] as const,
};

export function useAdminMutationDetailQuery(id: string, token?: string) {
  return useQuery({
    queryKey: adminMutationDetailQueryKeys.detail(id, token),
    queryFn: () => fetchAdminMutationDetail(id, token),
    enabled: id !== "",
  });
}
