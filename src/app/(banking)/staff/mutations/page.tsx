import type { Metadata } from "next";

import { StaffMutationsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Aktivitas Buku Besar Cabang",
};

export default function StaffMutationsPage() {
  return <StaffMutationsClient />;
}
