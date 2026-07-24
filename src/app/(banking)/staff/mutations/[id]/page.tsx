import type { Metadata } from "next";

import { StaffMutationDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Detail Entri Buku Besar",
};

export default async function StaffMutationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <StaffMutationDetailClient id={id} />;
}
