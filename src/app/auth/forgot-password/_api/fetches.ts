import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse } from "@/types/banking";

import type { ForgotPasswordPayload } from "./types";

export const forgotPassword = (payload: ForgotPasswordPayload) =>
  apiRequest<ApiSuccessResponse<{ otp_id?: string } | null>>(
    "/api/auth/forgot-password",
    {
      auth: false,
      method: "POST",
      body: payload,
    },
  );
