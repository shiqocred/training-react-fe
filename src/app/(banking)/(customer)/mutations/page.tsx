import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { CustomerMutationsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Mutasi Nasabah",
};

export default async function CustomerMutationsPage() {
  await requireAuth(["customer"]);

  return <CustomerMutationsClient />;
}
