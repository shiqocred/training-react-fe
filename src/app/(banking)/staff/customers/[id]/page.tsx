import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { StaffCustomerDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Profil Nasabah",
};

export default async function StaffCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth(["staff"]);
  const { id } = await params;

  return <StaffCustomerDetailClient id={id} />;
}
