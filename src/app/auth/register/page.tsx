import type { Metadata } from "next";

import { DaftarClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Daftar",
};

export default function DaftarPage() {
  return <DaftarClient />;
}
