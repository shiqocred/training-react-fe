import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse, CustomerDetailData, CustomerItem, OperationData } from "@/types/banking";

import type { CustomerPayload, TransactionAmountPayload, TransferPayload } from "./types";

export const fetchAdminCustomerDetail = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerDetailData>>(`/api/admin/customers/${id}`, { token });

export const updateAdminCustomer = (id: string, payload: CustomerPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<CustomerItem>>(`/api/admin/customers/${id}`, { method: "PUT", body: payload, token });

export const deleteAdminCustomer = (id: string, token?: string) =>
  apiRequest<ApiSuccessResponse<null>>(`/api/admin/customers/${id}`, { method: "DELETE", token });

export const depositAdminCustomer = (id: string, payload: TransactionAmountPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<OperationData>>(`/api/admin/customers/${id}/deposit`, { method: "POST", body: payload, token });

export const withdrawAdminCustomer = (id: string, payload: TransactionAmountPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<OperationData>>(`/api/admin/customers/${id}/withdraw`, { method: "POST", body: payload, token });

export const transferAdminCustomer = (id: string, payload: TransferPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<OperationData>>(`/api/admin/customers/${id}/transfer`, { method: "POST", body: payload, token });
