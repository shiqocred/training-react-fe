import type { Metadata } from "next";

import { ForgotPasswordClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Lupa Password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
