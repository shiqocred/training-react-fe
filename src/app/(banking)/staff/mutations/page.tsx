import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { StaffMutationsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Mutasi Staff",
};

export default async function StaffMutationsPage() {
  await requireAuth(["staff"]);

  return <StaffMutationsClient />;
}
