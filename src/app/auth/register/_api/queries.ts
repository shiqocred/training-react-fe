"use client";

import { useMutation } from "@tanstack/react-query";

import { register } from "./fetches";
import type { DaftarPayload } from "./types";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: DaftarPayload) => register(payload),
  });
}
