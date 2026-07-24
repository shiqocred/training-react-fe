import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse } from "@/types/banking";

import type { VerifyOtpData, VerifyOtpPayload } from "./types";

export const verifyOtp = (payload: VerifyOtpPayload) =>
  apiRequest<ApiSuccessResponse<VerifyOtpData>>("/api/auth/verify-otp", {
    auth: false,
    method: "POST",
    body: payload,
  });
