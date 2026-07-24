import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { AdminCustomerDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Profil Nasabah",
};

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth(["admin"]);
  const { id } = await params;

  return <AdminCustomerDetailClient id={id} />;
}
