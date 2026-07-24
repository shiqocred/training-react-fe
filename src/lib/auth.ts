import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiUrl } from "@/config";
import { getRoleHomePath, type AuthRole } from "@/lib/auth-routes";

type CheckAuthResponse = {
  status: boolean;
  message: string;
  data: AuthRole | null;
};

function isAuthRole(role: string | null | undefined): role is AuthRole {
  return role === "admin" || role === "staff" || role === "customer";
}

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
  console.log(json);
  const role = json.data ?? null;
  const isAuth = json.status === true && isAuthRole(role);

  return {
    isAuth,
    authenticated: isAuth,
    role: isAuth ? role : null,
  };
}

export async function redirectIfAuthenticated() {
  const { isAuth, role } = await auth();

  if (isAuth && role) redirect(getRoleHomePath(role));
}

export async function requireAuth(allowedRoles?: AuthRole[]) {
  const { isAuth, role } = await auth();

  if (!isAuth) redirect("/auth/login");

  if (!role) redirect("/auth/login");

  if (allowedRoles && !allowedRoles.includes(role)) {
    redirect(getRoleHomePath(role));
  }

  return { isAuth, role };
}
