import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { StaffCustomersClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Layanan Nasabah",
};

export default async function StaffCustomersPage() {
  await requireAuth(["staff"]);

  return <StaffCustomersClient />;
}
