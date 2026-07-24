import type { Metadata } from "next";

import { StaffCustomersClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Layanan Nasabah",
};

export default function StaffCustomersPage() {
  return <StaffCustomersClient />;
}
