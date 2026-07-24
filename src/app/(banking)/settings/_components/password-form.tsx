"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useUpdatePasswordMutation } from "../_api";

const schema = z
  .object({
    old_password: z.string().min(1, "Password lama wajib diisi"),
    new_password: z.string().min(8, "Password baru minimal 8 karakter"),
    verify_password: z.string().min(8, "Konfirmasi wajib diisi"),
  })
  .refine((value) => value.new_password === value.verify_password, {
    path: ["verify_password"],
    message: "Password baru tidak sama",
  });

type FormValues = z.infer<typeof schema>;

const values: FormValues = {
  old_password: "",
  new_password: "",
  verify_password: "",
};

const labels: Record<keyof FormValues, string> = {
  old_password: "Password lama",
  new_password: "Password baru",
  verify_password: "Konfirmasi password",
};

export function PasswordForm() {
  const { mutate: updatePassword, isPending } = useUpdatePasswordMutation();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });

  function submit(values: FormValues) {
    updatePassword(values, {
      onSuccess: () => {
        toast.success("Password berhasil diperbarui");
        form.reset();
      },
      onError: (error: Error) => {
        toast.error("Gagal memperbarui password", {
          description: error.message,
        });
      },
    });
  }

  return (
    <Card className="shadow-sm" size="sm">
      <CardHeader className="border-b">
        <CardTitle className="text-sm font-semibold">Password</CardTitle>
        <CardDescription className="text-xs">
          Perbarui kredensial login Anda agar akses akun tetap aman.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit(submit)}
          noValidate
        >
          <FieldGroup className="gap-3">
            {(["old_password", "new_password", "verify_password"] as const).map(
              (name) => (
                <Controller
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={`password-${name}`}
                        className="text-xs"
                      >
                        {labels[name]}
                      </FieldLabel>
                      <Input
                        id={`password-${name}`}
                        type="password"
                        className="text-xs placeholder:text-xs"
                        aria-invalid={fieldState.invalid}
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
              ),
            )}
          </FieldGroup>
          <Button size="sm" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
