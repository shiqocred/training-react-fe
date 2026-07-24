"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStaffMutationDetail } from "./fetches";

export const staffMutationDetailQueryKeys = {
  detail: (id: string, token?: string) => ["staff", "mutations", id, token] as const,
};

export function useStaffMutationDetailQuery(id: string, token?: string) {
  return useQuery({
    queryKey: staffMutationDetailQueryKeys.detail(id, token),
    queryFn: () => fetchStaffMutationDetail(id, token),
    enabled: id !== "",
  });
}
