import type { Metadata } from "next";

import { AdminMutationsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Pemantauan Buku Besar",
};

export default function AdminMutationsPage() {
  return <AdminMutationsClient />;
}
