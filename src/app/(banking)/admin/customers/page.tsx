import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { AdminCustomersClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Manajemen Nasabah",
};

export default async function AdminCustomersPage() {
  await requireAuth(["admin"]);

  return <AdminCustomersClient />;
}
