import type { Metadata } from "next";

import { StaffCustomerDetailClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Profil Nasabah",
};

export default async function StaffCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <StaffCustomerDetailClient id={id} />;
}
