import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse, UserData } from "@/types/banking";

import type { DaftarPayload } from "./types";

export const register = (payload: DaftarPayload) =>
  apiRequest<ApiSuccessResponse<UserData & { account_number: string }>>(
    "/api/auth/register",
    {
      auth: false,
      method: "POST",
      body: payload,
    },
  );
