import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse, MutationItem } from "@/types/banking";

export const fetchCustomerMutationDetail = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<MutationItem>>(`/api/customer/mutations/${id}`, { token });
