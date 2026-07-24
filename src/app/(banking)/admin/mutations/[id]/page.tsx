import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { AdminMutationDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Detail Entri Buku Besar",
};

export default async function AdminMutationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth(["admin"]);
  const { id } = await params;

  return <AdminMutationDetailClient id={id} />;
}
