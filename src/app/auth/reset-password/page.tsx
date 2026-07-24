import { Suspense } from "react";
import type { Metadata } from "next";

import { redirectIfAuthenticated } from "@/lib/auth";

import { ResetPasswordClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Atur Ulang Password",
};

export default async function ResetPasswordPage() {
  await redirectIfAuthenticated();

  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  );
}
