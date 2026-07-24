import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth";
import { getRoleHomePath } from "@/lib/auth-routes";

export const metadata: Metadata = {
  title: "Dasbor",
  description: "Dasbor perbankan operasional berbasis Fiber Banking API.",
};

export default async function Home() {
  const { role } = await requireAuth();

  redirect(getRoleHomePath(role));
}
