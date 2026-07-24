import { apiRequest } from "@/lib/api";
import type { AllMutationItem, ApiSuccessResponse } from "@/types/banking";

export const fetchStaffMutationDetail = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<AllMutationItem>>(`/api/staff/mutations/${id}`, { token });
