import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth";

import { SettingsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Pengaturan Akun",
};

export default async function SettingsPage() {
  await requireAuth();

  return <SettingsClient />;
}
