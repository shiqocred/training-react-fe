import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse, DashboardData } from "@/types/banking";

import type { DashboardResponse } from "./types";

export const fetchStaffDashboard = (token?: string) =>
  apiRequest<DashboardResponse>("/api/staff/dashboard", { token });

export const fetchAdminDashboard = (token?: string) =>
  apiRequest<ApiSuccessResponse<DashboardData>>("/api/admin/dashboard", {
    token,
  });

export const logout = (token?: string) =>
  apiRequest<ApiSuccessResponse<null>>("/api/auth/logout", {
    method: "POST",
    token,
  });
