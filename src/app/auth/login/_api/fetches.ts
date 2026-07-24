import { apiRequest } from "@/lib/api";
import type { ApiSuccessResponse, UserData } from "@/types/banking";

import type { MasukPayload } from "./types";

export const login = (payload: MasukPayload) =>
  apiRequest<ApiSuccessResponse<{ access_token: string; user: UserData }>>(
    "/api/auth/login",
    {
      auth: false,
      method: "POST",
      body: payload,
    },
  );
