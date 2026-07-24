import type { Metadata } from "next";

import { AdminStaffClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Administrasi Staff",
};

export default function AdminStaffPage() {
  return <AdminStaffClient />;
}
