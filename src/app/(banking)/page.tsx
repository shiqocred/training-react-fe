import type { Metadata } from "next";

import { DashboardClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Dasbor",
  description: "Dasbor perbankan operasional berbasis Fiber Banking API.",
};

export default function Home() {
  return <DashboardClient />;
}
