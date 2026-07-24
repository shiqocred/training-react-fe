"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

import { useResetPasswordMutation } from "../_api";

const schema = z
  .object({
    password: z.string().min(8, "Password minimal 8 karakter"),
    verify_password: z.string().min(8, "Konfirmasi wajib diisi"),
  })
  .refine((value) => value.password === value.verify_password, {
    path: ["verify_password"],
    message: "Password tidak sama",
  });

type FormValues = z.infer<typeof schema>;

const values: FormValues = {
  password: "",
  verify_password: "",
};

export function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";
  const { mutate: resetPasswordMutate, isPending } = useResetPasswordMutation();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });
  const canSubmit = email !== "" && token !== "";

  return (
    <AuthPanel
      title="Atur ulang password"
      description="Buat password baru menggunakan sesi reset yang sudah diverifikasi dari permintaan pemulihan email."
    >
      <form
        className="grid gap-3"
        onSubmit={form.handleSubmit((value) => {
          resetPasswordMutate(
            {
              email,
              reset_token: token,
              password: value.password,
              verify_password: value.verify_password,
            },
            {
              onSuccess: () => {
                toast.success("Password berhasil diperbarui", {
                  description:
                    "Silakan login kembali menggunakan password baru.",
                });
              },
              onError: (error) => {
                toast.error("Gagal memperbarui password", {
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
          Atur ulang password untuk{" "}
          <span className="font-medium text-foreground">
            {email || "email tidak ditemukan"}
          </span>
          .
        </div>
        <FieldGroup className="gap-3">
          {(["password", "verify_password"] as const).map((name) => (
            <Controller
              key={name}
              control={form.control}
              name={name}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`reset-${name}`}
                    className="text-xs capitalize"
                  >
                    {name.replace("_", " ")}
                  </FieldLabel>
                  <Input
                    id={`reset-${name}`}
                    type="password"
                    className="text-xs placeholder:text-xs"
                    aria-invalid={fieldState.invalid}
                    placeholder={
                      name === "password"
                        ? "Minimal 8 karakter"
                        : "Ulangi password baru"
                    }
                    {...field}
                  />
                  {fieldState.invalid ? (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  ) : null}
                </Field>
              )}
            />
          ))}
        </FieldGroup>
        <Button size="sm" disabled={!canSubmit || isPending}>
          {isPending ? "Menyimpan..." : "Simpan password baru"}
        </Button>

        {!canSubmit ? (
          <p className="text-center text-xs leading-5 text-muted-foreground">
            Sesi reset tidak lengkap. Mulai ulang dari halaman{" "}
            <Link
              href="/auth/forgot-password"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              lupa password
            </Link>
            .
          </p>
        ) : null}
      </form>
    </AuthPanel>
  );
}
