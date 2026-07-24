import type { Metadata } from "next";

import { CustomerMutationsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Mutasi Nasabah",
};

export default function CustomerMutationsPage() {
  return <CustomerMutationsClient />;
}
