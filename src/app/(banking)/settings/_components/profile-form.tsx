"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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

import {
  settingsQueryKeys,
  useMeQuery,
  useUpdateProfileMutation,
} from "../_api";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Email tidak valid"),
});

type FormValues = z.infer<typeof schema>;

export function ProfileForm() {
  const queryClient = useQueryClient();
  const { data } = useMeQuery();
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
  const user = data?.data;
  const values: FormValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
  };
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });

  function submit(values: FormValues) {
    updateProfile(values, {
      onSuccess: () => {
        toast.success("Profil berhasil diperbarui");
        queryClient.invalidateQueries({ queryKey: settingsQueryKeys.me() });
      },
      onError: (error: Error) => {
        toast.error("Gagal memperbarui profil", { description: error.message });
      },
    });
  }

  return (
    <Card className="shadow-sm" size="sm">
      <CardHeader className="border-b">
        <CardTitle className="text-sm font-semibold">Profil</CardTitle>
        <CardDescription className="text-xs">
          Kelola nama tampilan dan email akun yang digunakan pada data
          operasional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-3"
          onSubmit={form.handleSubmit(submit)}
          noValidate
        >
          <FieldGroup className="gap-3">
            {(["name", "email"] as const).map((name) => (
              <Controller
                key={name}
                control={form.control}
                name={name}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`profile-${name}`} className="text-xs">
                      {name === "name" ? "Nama" : "Email"}
                    </FieldLabel>
                    <Input
                      id={`profile-${name}`}
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
            ))}
          </FieldGroup>
          <Button size="sm" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan profil"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
