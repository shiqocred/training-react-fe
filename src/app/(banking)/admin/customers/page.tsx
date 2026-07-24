import type { Metadata } from "next";

import { AdminCustomersClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Manajemen Nasabah",
};

export default function AdminCustomersPage() {
  return <AdminCustomersClient />;
}
