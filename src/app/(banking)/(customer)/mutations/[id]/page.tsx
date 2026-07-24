import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { CustomerMutationDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Detail Transaksi",
};

export default async function CustomerMutationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth(["customer"]);
  const { id } = await params;

  return <CustomerMutationDetailClient id={id} />;
}
