"use client";

import { useMutation } from "@tanstack/react-query";

import { login } from "./fetches";
import type { MasukPayload } from "./types";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: MasukPayload) => login(payload),
  });
}
