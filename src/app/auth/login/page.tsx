import type { Metadata } from "next";

import { redirectIfAuthenticated } from "@/lib/auth";

import { MasukClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Masuk",
};

export default async function MasukPage() {
  await redirectIfAuthenticated();

  return <MasukClient />;
}
