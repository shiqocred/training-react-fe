import { apiRequest } from "@/lib/api";
import type { AllMutationItem, ApiSuccessResponse } from "@/types/banking";

export const fetchAdminMutationDetail = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<AllMutationItem>>(`/api/admin/mutations/${id}`, { token });
