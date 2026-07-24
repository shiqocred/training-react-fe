import "server-only";

import { cookies } from "next/headers";
import { apiUrl } from "@/config";
import type { AuthRole } from "@/lib/auth-routes";

type CheckAuthResponse = {
  status: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: AuthRole;
  } | null;
};

/**
 * Server-side auth check.
 * Membaca accessToken dari cookie dan memvalidasi session ke backend.
 */
export async function auth(): Promise<{
  isAuth: boolean;
  authenticated: boolean;
  role: AuthRole | null;
}> {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) return { isAuth: false, authenticated: false, role: null };

  const res = await fetch(`${apiUrl}/api/check-auth`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return { isAuth: false, authenticated: false, role: null };

  const json = (await res.json()) as CheckAuthResponse;
  const isAuth = json.status === true;

  return {
    isAuth,
    authenticated: isAuth,
    role: json.data?.role ?? null,
  };
}
