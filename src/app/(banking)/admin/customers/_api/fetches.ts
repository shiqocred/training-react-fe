import { apiRequest } from "@/lib/api";
import type {
  ApiListResponse,
  ApiSuccessResponse,
  CustomerItem,
} from "@/types/banking";

import type {
  CustomerListQuery,
  CustomerOptionItem,
  CustomerPayload,
} from "./types";

export const fetchAdminCustomers = (
  query: CustomerListQuery = {},
  token?: string,
) =>
  apiRequest<ApiListResponse<CustomerItem>>(
    `/api/admin/customers${toSearch(query)}`,
    { token },
  );

export const fetchAdminCustomerOptions = (token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerOptionItem[]>>(
    "/api/admin/customers/options",
    { token },
  );

export const createAdminCustomer = (payload: CustomerPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerItem>>("/api/admin/customers", {
    method: "POST",
    body: payload,
    token,
  });

const toSearch = (query: CustomerListQuery) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const search = params.toString();
  return search ? `?${search}` : "";
};
