"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchMe, updatePassword, updateProfile } from "./fetches";
import type { UpdatePasswordPayload, UpdateProfilePayload } from "./types";

export const settingsQueryKeys = {
  me: (token?: string) => ["settings", "me", token] as const,
};

export function useMeQuery(token?: string) {
  return useQuery({
    queryKey: settingsQueryKeys.me(token),
    queryFn: () => fetchMe(token),
  });
}

export function useUpdateProfileMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload, token),
  });
}

export function useUpdatePasswordMutation(token?: string) {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updatePassword(payload, token),
  });
}
