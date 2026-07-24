"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  adminStaffQueryKeys,
  useCreateAdminStaffMutation,
  useUpdateAdminStaffMutation,
} from "@/app/(banking)/admin/staff/_api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { StaffItem } from "@/types/banking";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export function StaffFormDialog({
  mode,
  staff,
  open,
  onOpenChange,
  triggerLabel,
}: {
  mode: "create" | "update";
  staff?: StaffItem;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
}) {
  const queryClient = useQueryClient();
  const { mutate: createStaff, isPending: creatingStaff } =
    useCreateAdminStaffMutation();
  const { mutate: updateStaff, isPending: updatingStaff } =
    useUpdateAdminStaffMutation();
  const isPending = creatingStaff || updatingStaff;
  const values: FormValues = {
    name: staff?.name ?? "",
    email: staff?.email ?? "",
    password: "",
  };
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });

  function closeDialog() {
    onOpenChange?.(false);
  }

  function submit(values: FormValues) {
    const payload = {
      name: values.name,
      email: values.email,
      ...(values.password ? { password: values.password } : {}),
    };
    const handlers = {
      onSuccess: () => {
        toast.success(
          mode === "create"
            ? "Staff berhasil ditambahkan"
            : "Data staff berhasil diperbarui",
        );
        queryClient.invalidateQueries({ queryKey: adminStaffQueryKeys.list() });
        closeDialog();
      },
      onError: (error: Error) => {
        toast.error("Gagal menyimpan staff", { description: error.message });
      },
    };

    if (mode === "create") {
      createStaff(payload, handlers);
      return;
    }

    if (staff?.id) {
      updateStaff({ id: staff.id, payload }, handlers);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open === undefined ? (
        <DialogTrigger render={<Button size="sm" />}>
          {triggerLabel ?? (mode === "create" ? "Tambah staff" : "Ubah")}
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Buat staff" : "Ubah staff"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Kelola profil dan akses staff operasional melalui endpoint admin
            staff.
          </DialogDescription>
        </DialogHeader>
        <form
          id={`staff-${mode}-dialog-form`}
          className="grid gap-3"
          onSubmit={form.handleSubmit(submit)}
          noValidate
        >
          <FieldGroup className="gap-3">
            {(["name", "email", "password"] as const).map((name) => (
              <Controller
                key={name}
                control={form.control}
                name={name}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={`staff-${mode}-${name}`}
                      className="text-xs"
                    >
                      {name === "name"
                        ? "Nama"
                        : name === "email"
                          ? "Email"
                          : "Password"}
                    </FieldLabel>
                    <Input
                      id={`staff-${mode}-${name}`}
                      type={name === "password" ? "password" : "text"}
                      placeholder={
                        name === "password" && mode === "update"
                          ? "Kosongkan jika tidak diubah"
                          : undefined
                      }
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
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form={`staff-${mode}-dialog-form`}
            size="sm"
            disabled={isPending}
          >
            {isPending
              ? "Menyimpan..."
              : mode === "create"
                ? "Tambah staff"
                : "Simpan perubahan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
