import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getRoleHomePath, type AuthRole } from "@/lib/auth-routes";

type CheckAuthResponse = {
  status: boolean;
  message: string;
  data: {
    role: AuthRole;
  } | null;
};

const apiUrl =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const authPrefix = "/auth";
const protectedPrefixes = ["/admin", "/staff", "/mutations", "/settings"];

function isProtectedPath(pathname: string) {
  return pathname === "/" || protectedPrefixes.some((path) => pathname.startsWith(path));
}

function expectedRole(pathname: string): AuthRole | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/staff")) return "staff";
  if (pathname.startsWith("/mutations")) return "customer";

  return null;
}

async function checkAuth(token: string) {
  const response = await fetch(`${apiUrl}/api/check-auth`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) return { isAuth: false, role: null };

  const body = (await response.json().catch(() => null)) as CheckAuthResponse | null;
  const isAuth = body?.status === true;

  return {
    isAuth,
    role: isAuth ? (body?.data?.role ?? null) : null,
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith(authPrefix);
  const shouldProtect = isProtectedPath(pathname);

  if (!isAuthPage && !shouldProtect) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    if (isAuthPage) return NextResponse.next();

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const { isAuth, role } = await checkAuth(token);

  if (!isAuth || !role) {
    const response = isAuthPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/login", request.url));

    response.cookies.delete("accessToken");
    return response;
  }

  const roleHome = getRoleHomePath(role);

  if (isAuthPage || pathname === "/") {
    return NextResponse.redirect(new URL(roleHome, request.url));
  }

  const requiredRole = expectedRole(pathname);

  if (requiredRole && requiredRole !== role) {
    return NextResponse.redirect(new URL(roleHome, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/staff/:path*", "/mutations/:path*", "/settings", "/auth/:path*"],
};
