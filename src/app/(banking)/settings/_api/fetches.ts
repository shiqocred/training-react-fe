import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse, MeData, UserData } from "@/types/banking";

import type { UpdatePasswordPayload, UpdateProfilePayload } from "./types";

export const fetchMe = (token?: string) =>
  apiRequest<ApiSuccessResponse<MeData>>("/api/me", { token });

export const updateProfile = (payload: UpdateProfilePayload, token?: string) =>
  apiRequest<ApiSuccessResponse<UserData>>("/api/settings/profile", {
    method: "PUT",
    body: payload,
    token,
  });

export const updatePassword = (payload: UpdatePasswordPayload, token?: string) =>
  apiRequest<ApiSuccessResponse<null>>("/api/settings/password", {
    method: "PUT",
    body: payload,
    token,
  });
