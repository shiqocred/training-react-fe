"use client";

import { useMutation } from "@tanstack/react-query";

import { verifyOtp } from "./fetches";
import type { VerifyOtpPayload } from "./types";

export function useVerifyOtpMutation() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
  });
}
