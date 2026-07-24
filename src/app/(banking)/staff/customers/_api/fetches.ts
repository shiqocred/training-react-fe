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

export const fetchStaffCustomers = (
  query: CustomerListQuery = {},
  token?: string,
) =>
  apiRequest<ApiListResponse<CustomerItem>>(
    `/api/staff/customers${toSearch(query)}`,
    { token },
  );

export const fetchStaffCustomerOptions = (token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerOptionItem[]>>(
    "/api/staff/customers/options",
    { token },
  );

export const createStaffCustomer = (payload: CustomerPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerItem>>("/api/staff/customers", {
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
