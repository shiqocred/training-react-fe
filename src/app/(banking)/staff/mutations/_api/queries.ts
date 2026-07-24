"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStaffMutations } from "./fetches";
import type { MutationListQuery } from "./types";

export const staffMutationQueryKeys = {
  list: (query: MutationListQuery = {}, token?: string) =>
    ["staff", "mutations", query, token] as const,
};

export function useStaffMutationsQuery(query: MutationListQuery = {}, token?: string) {
  return useQuery({
    queryKey: staffMutationQueryKeys.list(query, token),
    queryFn: () => fetchStaffMutations(query, token),
  });
}
