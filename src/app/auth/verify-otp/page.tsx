import { Suspense } from "react";
import type { Metadata } from "next";

import { redirectIfAuthenticated } from "@/lib/auth";

import { VerifyOtpClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Verifikasi OTP",
};

export default async function VerifyOtpPage() {
  await redirectIfAuthenticated();

  return (
    <Suspense>
      <VerifyOtpClient />
    </Suspense>
  );
}
