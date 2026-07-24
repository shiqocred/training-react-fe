import { Suspense } from "react";
import type { Metadata } from "next";

import { VerifyOtpClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Verifikasi OTP",
};

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtpClient />
    </Suspense>
  );
}
