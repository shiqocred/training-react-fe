"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, UserPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AuthPanel } from "@/components/auth-panel";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { setAccessTokenCookie } from "@/lib/auth-cookies";
import { getRoleHomePath } from "@/lib/auth-routes";

import { useLoginMutation } from "../_api";

const schema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

const values: FormValues = {
  email: "customer@example.com",
  password: "password123",
};

export function MasukClient() {
  const router = useRouter();
  const { mutate: loginMutate, isPending } = useLoginMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    values,
  });

  return (
    <AuthPanel title="Masuk" description="Masuk ke akun ruang kerja perbankan.">
      <form
        className="grid gap-3"
        onSubmit={form.handleSubmit((value) => {
          loginMutate(value, {
            onSuccess: (response) => {
              setAccessTokenCookie(response.data.access_token);
              toast.success("Berhasil masuk", {
                description: "Token akses telah disimpan untuk sesi ini.",
              });
              router.push(getRoleHomePath(response.data.user.role));
            },
            onError: (error) => {
              toast.error("Gagal masuk", {
                description:
                  error instanceof Error ? error.message : "Silakan coba lagi.",
              });
            },
          });
        })}
        noValidate
      >
        <FieldGroup className="gap-3">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email" className="text-xs">
                  Email
                </FieldLabel>
                <Input
                  id="login-email"
                  className="text-xs"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid ? (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-password" className="text-xs">
                  Password
                </FieldLabel>
                <Input
                  id="login-password"
                  type="password"
                  className="text-xs"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid ? (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
        </FieldGroup>
        <Button size="sm" disabled={isPending} type="submit">
          {isPending ? "Memproses..." : "Masuk"}
        </Button>
        <div className="grid gap-2 text-xs">
          <Link
            href="/auth/register"
            className="group flex items-center justify-between rounded-lg border bg-muted/35 px-3 py-2 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-background text-foreground shadow-sm">
                <UserPlus className="size-3.5" />
              </span>
              <span>
                <span className="block font-medium text-foreground">
                  Buat akun nasabah
                </span>
                <span className="leading-5">
                  Daftar rekening baru secara mandiri
                </span>
              </span>
            </span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/auth/forgot-password"
            className="group flex items-center justify-between rounded-lg border bg-muted/35 px-3 py-2 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-background text-foreground shadow-sm">
                <KeyRound className="size-3.5" />
              </span>
              <span>
                <span className="block font-medium text-foreground">
                  Lupa password?
                </span>
                <span className="leading-5">
                  Pulihkan akses dengan kode OTP
                </span>
              </span>
            </span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </form>
    </AuthPanel>
  );
}
