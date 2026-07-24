"use client";

import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "./fetches";
import type { ResetPasswordPayload } from "./types";

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  });
}
