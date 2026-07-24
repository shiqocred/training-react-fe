import type { Metadata } from "next";

import { CustomerMutationDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Detail Transaksi",
};

export default async function CustomerMutationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CustomerMutationDetailClient id={id} />;
}
