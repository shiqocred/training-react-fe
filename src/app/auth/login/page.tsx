import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getRoleHomePath } from "@/lib/auth-routes";
import { auth } from "@/lib/auth";

import { MasukClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Masuk",
};

export default async function MasukPage() {
  const { isAuth, role } = await auth();

  if (isAuth) {
    redirect(getRoleHomePath(role));
  }

  return <MasukClient />;
}
