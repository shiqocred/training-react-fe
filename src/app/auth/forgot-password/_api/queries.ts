"use client";

import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "./fetches";
import type { ForgotPasswordPayload } from "./types";

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
}
