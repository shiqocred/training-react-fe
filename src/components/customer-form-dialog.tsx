"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  adminCustomerQueryKeys,
  useCreateAdminCustomerMutation,
} from "@/app/(banking)/admin/customers/_api";
import {
  adminCustomerDetailQueryKeys,
  useUpdateAdminCustomerMutation,
} from "@/app/(banking)/admin/customers/[id]/_api";
import {
  staffCustomerQueryKeys,
  useCreateStaffCustomerMutation,
} from "@/app/(banking)/staff/customers/_api";
import {
  staffCustomerDetailQueryKeys,
  useUpdateStaffCustomerMutation,
} from "@/app/(banking)/staff/customers/[id]/_api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CustomerItem, CustomerStatus } from "@/types/banking";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .optional()
    .or(z.literal("")),
  status: z.enum(["active", "inactive", "blocked"]),
});

type FormValues = z.infer<typeof schema>;

const statusOptions: { value: CustomerStatus; label: string }[] = [
  { value: "active", label: "Aktif" },
  { value: "inactive", label: "Nonaktif" },
  { value: "blocked", label: "Diblokir" },
];

export function CustomerFormDialog({
  mode,
  scope,
  customer,
  triggerLabel,
  triggerVariant = "default",
  open,
  onOpenChange,
}: {
  mode: "create" | "update";
  scope: "admin" | "staff";
  customer?: CustomerItem;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary" | "ghost";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: createAdminCustomer, isPending: creatingAdmin } =
    useCreateAdminCustomerMutation();
  const { mutate: updateAdminCustomer, isPending: updatingAdmin } =
    useUpdateAdminCustomerMutation();
  const { mutate: createStaffCustomer, isPending: creatingStaff } =
    useCreateStaffCustomerMutation();
  const { mutate: updateStaffCustomer, isPending: updatingStaff } =
    useUpdateStaffCustomerMutation();
  const isPending =
    creatingAdmin || updatingAdmin || creatingStaff || updatingStaff;
  const values: FormValues = {
    name: customer?.name ?? "",
    email: customer?.email ?? "",
    password: "",
    status: customer?.status ?? "active",
  };
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });
  const label = triggerLabel ?? (mode === "create" ? "Tambah nasabah" : "Ubah");

  function closeDialog() {
    onOpenChange?.(false);
  }

  function invalidateCustomerQueries() {
    if (scope === "admin") {
      queryClient.invalidateQueries({
        queryKey: adminCustomerQueryKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: adminCustomerQueryKeys.options(),
      });
      if (customer?.id) {
        queryClient.invalidateQueries({
          queryKey: adminCustomerDetailQueryKeys.detail(customer.id),
        });
      }
      return;
    }

    queryClient.invalidateQueries({ queryKey: staffCustomerQueryKeys.list() });
    queryClient.invalidateQueries({
      queryKey: staffCustomerQueryKeys.options(),
    });
    if (customer?.id) {
      queryClient.invalidateQueries({
        queryKey: staffCustomerDetailQueryKeys.detail(customer.id),
      });
    }
  }

  function submit(values: FormValues) {
    const payload = {
      name: values.name,
      email: values.email,
      status: values.status,
      ...(values.password ? { password: values.password } : {}),
    };
    const handlers = {
      onSuccess: () => {
        toast.success(
          mode === "create"
            ? "Nasabah berhasil ditambahkan"
            : "Data nasabah berhasil diperbarui",
        );
        invalidateCustomerQueries();
        closeDialog();
      },
      onError: (error: Error) => {
        toast.error("Gagal menyimpan nasabah", { description: error.message });
      },
    };

    if (scope === "admin") {
      if (mode === "create") {
        createAdminCustomer(payload, handlers);
        return;
      }
      if (customer?.id) {
        updateAdminCustomer({ id: customer.id, payload }, handlers);
      }
      return;
    }

    if (mode === "create") {
      createStaffCustomer(payload, handlers);
      return;
    }
    if (customer?.id) {
      updateStaffCustomer({ id: customer.id, payload }, handlers);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open === undefined ? (
        <DialogTrigger render={<Button size="sm" variant={triggerVariant} />}>
          {label}
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tambah nasabah" : "Ubah nasabah"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Simpan profil nasabah sesuai endpoint{" "}
            {scope === "admin" ? "admin" : "staff"}.
          </DialogDescription>
        </DialogHeader>
        <form
          id={`customer-${mode}-form`}
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
                      htmlFor={`customer-${mode}-${name}`}
                      className="text-xs"
                    >
                      {name === "name"
                        ? "Nama"
                        : name === "email"
                          ? "Email"
                          : "Password"}
                    </FieldLabel>
                    <Input
                      id={`customer-${mode}-${name}`}
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
            <Controller
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs">Status</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className="w-full text-xs"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                      {statusOptions.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          className="text-xs"
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid ? (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  ) : null}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form={`customer-${mode}-form`}
            size="sm"
            disabled={isPending}
          >
            {isPending
              ? "Menyimpan..."
              : mode === "create"
                ? "Tambah nasabah"
                : "Simpan perubahan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
