import type { Metadata } from "next";

import { redirectIfAuthenticated } from "@/lib/auth";

import { ForgotPasswordClient } from "./_components/client";

export const metadata: Metadata = {
  title: "Lupa Password",
};

export default async function ForgotPasswordPage() {
  await redirectIfAuthenticated();

  return <ForgotPasswordClient />;
}
