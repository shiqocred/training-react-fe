import type { Metadata } from "next";

import { SettingsClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Pengaturan Akun",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
