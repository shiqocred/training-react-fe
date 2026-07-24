"use client";

import { PageHeader } from "@/components/page-header";

import { PasswordForm } from "./password-form";
import { ProfileForm } from "./profile-form";

export function SettingsClient() {
  return (
    <>
      <PageHeader
        title="Pengaturan Akun"
        description="Pastikan informasi profil dan kredensial keamanan Anda selalu terbaru."
      />
      <div className="grid gap-3 lg:grid-cols-2">
        <ProfileForm />
        <PasswordForm />
      </div>
    </>
  );
}
