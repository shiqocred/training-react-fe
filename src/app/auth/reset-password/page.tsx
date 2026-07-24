import { Suspense } from "react";
import type { Metadata } from "next";

import { ResetPasswordClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Atur Ulang Password",
};

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  );
}
