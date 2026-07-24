import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse, CustomerDetailData, CustomerItem, OperationData } from "@/types/banking";

import type { CustomerPayload, TransactionAmountPayload, TransferPayload } from "./types";

export const fetchStaffCustomerDetail = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerDetailData>>(`/api/staff/customers/${id}`, { token });

export const updateStaffCustomer = (id: string, payload: CustomerPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerItem>>(`/api/staff/customers/${id}`, { method: "PUT", body: payload, token });

export const deleteStaffCustomer = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<null>>(`/api/staff/customers/${id}`, { method: "DELETE", token });

export const depositStaffCustomer = (id: string, payload: TransactionAmountPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<OperationData>>(`/api/staff/customers/${id}/deposit`, { method: "POST", body: payload, token });

export const withdrawStaffCustomer = (id: string, payload: TransactionAmountPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<OperationData>>(`/api/staff/customers/${id}/withdraw`, { method: "POST", body: payload, token });

export const transferStaffCustomer = (id: string, payload: TransferPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<OperationData>>(`/api/staff/customers/${id}/transfer`, { method: "POST", body: payload, token });
