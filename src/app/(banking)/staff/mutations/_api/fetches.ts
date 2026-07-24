import { apiRequest } from "@/lib/api";
import type { AllMutationItem, ApiListResponse } from "@/types/banking";

import type { MutationListQuery } from "./types";

export const fetchStaffMutations = (query: MutationListQuery = {}, token?: string) =>
  apiRequest<ApiListResponse<AllMutationItem>>(`/api/staff/mutations${toSearch(query)}`, { token });

const toSearch = (query: MutationListQuery) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const search = params.toString();
  return search ? `?${search}` : "";
};
