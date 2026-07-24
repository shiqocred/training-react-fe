import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { AdminStaffClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Administrasi Staff",
};

export default async function AdminStaffPage() {
  await requireAuth(["admin"]);

  return <AdminStaffClient />;
}
