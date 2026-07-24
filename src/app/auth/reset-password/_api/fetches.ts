import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse } from "@/types/banking";

import type { ResetPasswordPayload } from "./types";

export const resetPassword = (payload: ResetPasswordPayload) =>
  apiRequest<ApiSuccessResponse<null>>("/api/auth/reset-password", {
    auth: false,
    method: "POST",
    body: payload,
  });
