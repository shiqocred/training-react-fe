"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn, ShieldCheck } from "lucide-react";
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

import { useRegisterMutation } from "../_api";

const schema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirm_password: z.string().min(8, "Konfirmasi password wajib diisi"),
  })
  .refine((value) => value.password === value.confirm_password, {
    path: ["confirm_password"],
    message: "Konfirmasi password tidak sama",
  });

type FormValues = z.infer<typeof schema>;

const values: FormValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const fields = [
  {
    name: "name",
    label: "Nama",
    type: "text",
    placeholder: "Nama lengkap",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "nama@email.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Minimal 8 karakter",
  },
  {
    name: "confirm_password",
    label: "Konfirmasi password",
    type: "password",
    placeholder: "Ulangi password",
  },
] as const;

export function DaftarClient() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegisterMutation();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });

  function submit(values: FormValues) {
    register(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success("Registrasi berhasil", {
            description: "Silakan masuk menggunakan akun yang baru dibuat.",
          });
          router.push("/auth/login");
        },
        onError: (error: Error) => {
          toast.error("Registrasi gagal", { description: error.message });
        },
      },
    );
  }

  return (
    <AuthPanel
      title="Daftar"
      description="Buat profil nasabah dan siapkan rekening perbankan untuk onboarding yang aman."
    >
      <form
        className="grid gap-3"
        onSubmit={form.handleSubmit(submit)}
        noValidate
      >
        <FieldGroup className="gap-3">
          {fields.map((item) => (
            <Controller
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`register-${item.name}`}
                    className="text-xs"
                  >
                    {item.label}
                  </FieldLabel>
                  <Input
                    id={`register-${item.name}`}
                    type={item.type}
                    className="text-xs placeholder:text-xs"
                    aria-invalid={fieldState.invalid}
                    placeholder={item.placeholder}
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
        <Button size="sm" className="gap-2" disabled={isPending}>
          <ShieldCheck className="size-3.5" />
          {isPending ? "Mendaftarkan..." : "Daftar akun"}
        </Button>
        <Link
          href="/auth/login"
          className="group flex items-center justify-between rounded-lg border bg-muted/35 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-background text-foreground shadow-sm">
              <LogIn className="size-3.5" />
            </span>
            <span>
              <span className="block font-medium text-foreground">
                Sudah punya akun?
              </span>
              <span className="leading-5">
                Masuk ke dashboard banking dengan akun terdaftar
              </span>
            </span>
          </span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </form>
    </AuthPanel>
  );
}
