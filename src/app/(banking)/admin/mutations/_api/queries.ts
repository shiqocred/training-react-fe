"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAdminMutations } from "./fetches";
import type { MutationListQuery } from "./types";

export const adminMutationQueryKeys = {
  list: (query: MutationListQuery = {}, token?: string) =>
    ["admin", "mutations", query, token] as const,
};

export function useAdminMutationsQuery(query: MutationListQuery = {}, token?: string) {
  return useQuery({
    queryKey: adminMutationQueryKeys.list(query, token),
    queryFn: () => fetchAdminMutations(query, token),
  });
}
