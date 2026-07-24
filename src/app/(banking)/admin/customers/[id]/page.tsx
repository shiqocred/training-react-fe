import type { Metadata } from "next";

import { AdminCustomerDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Profil Nasabah",
};

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdminCustomerDetailClient id={id} />;
}
