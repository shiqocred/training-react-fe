import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { AdminMutationsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Buku Besar Admin",
};

export default async function AdminMutationsPage() {
  await requireAuth(["admin"]);

  return <AdminMutationsClient />;
}
