"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchAdminDashboard, fetchStaffDashboard, logout } from "./fetches";

export const dashboardQueryKeys = {
  staff: (token?: string) => ["dashboard", "staff", token] as const,
  admin: (token?: string) => ["dashboard", "admin", token] as const,
};

export function useStaffDashboardQuery(token?: string) {
  return useQuery({
    queryKey: dashboardQueryKeys.staff(token),
    queryFn: () => fetchStaffDashboard(token),
  });
}

export function useAdminDashboardQuery(token?: string) {
  return useQuery({
    queryKey: dashboardQueryKeys.admin(token),
    queryFn: () => fetchAdminDashboard(token),
  });
}

export function useLogoutMutation(token?: string) {
  return useMutation({
    mutationFn: () => logout(token),
  });
}
