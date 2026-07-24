import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { StaffMutationDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Detail Entri Buku Besar",
};

export default async function StaffMutationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth(["staff"]);
  const { id } = await params;

  return <StaffMutationDetailClient id={id} />;
}
