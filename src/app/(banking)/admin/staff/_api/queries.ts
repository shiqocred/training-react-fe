"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { createAdminStaff, deleteAdminStaff, fetchAdminStaff, updateAdminStaff } from "./fetches";
import type { StaffListQuery, StaffPayload } from "./types";

export const adminStaffQueryKeys = {
  list: (query: StaffListQuery = {}, token?: string) =>
    ["admin", "staff", query, token] as const,
};

export function useAdminStaffQuery(query: StaffListQuery = {}, token?: string) {
  return useQuery({
    queryKey: adminStaffQueryKeys.list(query, token),
    queryFn: () => fetchAdminStaff(query, token),
  });
}

export function useCreateAdminStaffMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: StaffPayload) => createAdminStaff(payload, token),
  });
}

export function useUpdateAdminStaffMutation(token?: string) {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: StaffPayload }) =>
      updateAdminStaff(id, payload, token),
  });
}

export function useDeleteAdminStaffMutation(token?: string) {
  return useMutation({
    mutationFn: (id: string) => deleteAdminStaff(id, token),
  });
}
