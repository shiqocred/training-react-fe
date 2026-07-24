import { apiRequest } from "@/lib/api";
import type {
  ApiListResponse,
  ApiSuccessResponse,
  MutationItem,
  OperationData,
} from "@/types/banking";

import type {
  CustomerMutationListQuery,
  TransactionAmountPayload,
  TransferPayload,
} from "./types";

export const fetchCustomerMutations = (
  query: CustomerMutationListQuery = {},
  token?: string,
) =>
  apiRequest<ApiListResponse<MutationItem>>(
    `/api/customer/mutations${toSearch(query)}`,
    { token },
  );

export const depositCustomer = (
  payload: TransactionAmountPayload,
  token?: string,
) =>
  apiRequest<ApiSuccessResponse<OperationData>>("/api/customer/deposit", {
    method: "POST",
    body: payload,
    token,
  });

export const withdrawCustomer = (
  payload: TransactionAmountPayload,
  token?: string,
) =>
  apiRequest<ApiSuccessResponse<OperationData>>("/api/customer/withdraw", {
    method: "POST",
    body: payload,
    token,
  });

export const transferCustomer = (payload: TransferPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<OperationData>>("/api/customer/transfer", {
    method: "POST",
    body: payload,
    token,
  });

const toSearch = (query: CustomerMutationListQuery) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const search = params.toString();
  return search ? `?${search}` : "";
};
