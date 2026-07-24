"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, RotateCcw } from "lucide-react";
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

import { useForgotPasswordMutation } from "../../forgot-password/_api";
import { useVerifyOtpMutation } from "../_api";

const schema = z.object({
  otp: z.string().min(6, "OTP 6 digit").max(6, "OTP 6 digit"),
});

type FormValues = z.infer<typeof schema>;

const values: FormValues = { otp: "" };

export function VerifyOtpClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [countdown, setCountdown] = React.useState(30);
  const { mutate: forgotPasswordMutate, isPending: isResendingOtp } =
    useForgotPasswordMutation();
  const { mutate: verifyOtpMutate, isPending: isVerifyingOtp } =
    useVerifyOtpMutation();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });
  const canSubmit = email !== "";

  React.useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(
      () => setCountdown((value) => value - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [countdown]);

  return (
    <AuthPanel
      title="Verifikasi OTP"
      description="Masukkan kode enam digit yang dikirim ke email Anda untuk melanjutkan pemulihan password."
    >
      <form
        className="grid gap-3"
        onSubmit={form.handleSubmit((value) => {
          verifyOtpMutate(
            {
              email,
              otp: value.otp,
            },
            {
              onSuccess: (response) => {
                toast.success("OTP valid", {
                  description: "Silakan buat password baru untuk akun Anda.",
                });
                router.push(
                  `/auth/reset-password?email=${encodeURIComponent(response.data.email)}&token=${encodeURIComponent(response.data.reset_token)}`,
                );
              },
              onError: (error) => {
                toast.error("OTP tidak valid", {
                  description:
                    error instanceof Error
                      ? error.message
                      : "Silakan coba lagi.",
                });
              },
            },
          );
        })}
        noValidate
      >
        <div className="rounded-lg border bg-muted/40 p-3 text-xs leading-5 text-muted-foreground">
          Kode OTP dikirim ke{" "}
          <span className="font-medium text-foreground">
            {email || "email tidak ditemukan"}
          </span>
          .
        </div>
        <FieldGroup className="gap-3">
          <Controller
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="verify-otp" className="text-xs">
                  Kode OTP
                </FieldLabel>
                <Input
                  id="verify-otp"
                  inputMode="numeric"
                  maxLength={6}
                  className="text-xs placeholder:text-xs"
                  aria-invalid={fieldState.invalid}
                  placeholder="Masukkan 6 digit OTP"
                  {...field}
                />
                {fieldState.invalid ? (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
        </FieldGroup>
        <Button size="sm" disabled={!canSubmit || isVerifyingOtp}>
          {isVerifyingOtp ? "Memverifikasi..." : "Verifikasi OTP"}
        </Button>

        <div className="grid gap-2 rounded-lg border bg-muted/35 p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-3">
            <span>Tidak menerima kode?</span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 text-xs"
              disabled={countdown > 0 || !canSubmit || isResendingOtp}
              onClick={() => {
                forgotPasswordMutate(
                  { email },
                  {
                    onSuccess: () => {
                      setCountdown(30);
                      toast.success("OTP berhasil dikirim ulang");
                    },
                    onError: (error) => {
                      toast.error("Gagal mengirim ulang OTP", {
                        description:
                          error instanceof Error
                            ? error.message
                            : "Silakan coba lagi.",
                      });
                    },
                  },
                );
              }}
            >
              <RotateCcw className="size-3" />
              {countdown > 0 ? `Kirim ulang ${countdown}s` : "Kirim ulang OTP"}
            </Button>
          </div>
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
          >
            <ArrowLeft className="size-3" />
            Ganti email pemulihan
          </Link>
        </div>
      </form>
    </AuthPanel>
  );
}
