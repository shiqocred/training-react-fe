import { apiRequest } from "@/lib/api";
import type { ApiListResponse, ApiSuccessResponse, StaffItem } from "@/types/banking";

import type { StaffListQuery, StaffPayload } from "./types";

export const fetchAdminStaff = (query: StaffListQuery = {}, token?: string) =>
  apiRequest<ApiListResponse<StaffItem>>(`/api/admin/staff${toSearch(query)}`, { token });

export const createAdminStaff = (payload: StaffPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<StaffItem>>("/api/admin/staff", { method: "POST", body: payload, token });

export const updateAdminStaff = (id: string, payload: StaffPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<StaffItem>>(`/api/admin/staff/${id}`, { method: "PUT", body: payload, token });

export const deleteAdminStaff = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<null>>(`/api/admin/staff/${id}`, { method: "DELETE", token });

const toSearch = (query: StaffListQuery) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const search = params.toString();
  return search ? `?${search}` : "";
};
