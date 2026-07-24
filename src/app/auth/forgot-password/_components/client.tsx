"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MailCheck } from "lucide-react";
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

import { useForgotPasswordMutation } from "../_api";

const schema = z.object({ email: z.email("Email tidak valid") });

type FormValues = z.infer<typeof schema>;

const values: FormValues = { email: "customer@example.com" };

export function ForgotPasswordClient() {
  const router = useRouter();
  const { mutate: forgotPasswordMutate, isPending } =
    useForgotPasswordMutation();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });

  return (
    <AuthPanel
      title="Lupa password"
      description="Masukkan email akun Anda dan kami akan mengirim OTP aman untuk pemulihan."
    >
      <form
        className="grid gap-3"
        onSubmit={form.handleSubmit((value) => {
          forgotPasswordMutate(value, {
            onSuccess: () => {
              toast.success("OTP berhasil dikirim", {
                description:
                  "Silakan cek email untuk melanjutkan pemulihan akun.",
              });
              const email = encodeURIComponent(value.email);
              router.push(`/auth/verify-otp?email=${email}`);
            },
            onError: (error) => {
              toast.error("Gagal mengirim OTP", {
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
                <FieldLabel htmlFor="forgot-email" className="text-xs">
                  Email
                </FieldLabel>
                <Input
                  id="forgot-email"
                  className="text-xs placeholder:text-xs"
                  aria-invalid={fieldState.invalid}
                  placeholder="nama@email.com"
                  {...field}
                />
                {fieldState.invalid ? (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
        </FieldGroup>
        <Button size="sm" className="gap-2" disabled={isPending}>
          <MailCheck className="size-3.5" />
          {isPending ? "Mengirim..." : "Kirim OTP"}
        </Button>

        <div className="flex items-center justify-between rounded-lg border bg-muted/35 px-3 py-2 text-xs text-muted-foreground">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
          >
            <ArrowLeft className="size-3" />
            Kembali login
          </Link>
          <span>OTP berlaku sementara</span>
        </div>
      </form>
    </AuthPanel>
  );
}
