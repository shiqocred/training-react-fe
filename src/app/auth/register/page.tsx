import type { Metadata } from "next";

import { redirectIfAuthenticated } from "@/lib/auth";

import { DaftarClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Daftar",
};

export default async function DaftarPage() {
  await redirectIfAuthenticated();

  return <DaftarClient />;
}
