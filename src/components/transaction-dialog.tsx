"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  customerMutationQueryKeys,
  useDepositCustomerMutation,
  useTransferCustomerMutation,
  useWithdrawCustomerMutation,
} from "@/app/(banking)/(customer)/mutations/_api";
import {
  adminCustomerQueryKeys,
  useAdminCustomerOptionsQuery,
} from "@/app/(banking)/admin/customers/_api";
import {
  useDepositAdminCustomerMutation,
  useTransferAdminCustomerMutation,
  useWithdrawAdminCustomerMutation,
} from "@/app/(banking)/admin/customers/[id]/_api";
import { adminMutationQueryKeys } from "@/app/(banking)/admin/mutations/_api";
import {
  staffCustomerQueryKeys,
  useStaffCustomerOptionsQuery,
} from "@/app/(banking)/staff/customers/_api";
import {
  useDepositStaffCustomerMutation,
  useTransferStaffCustomerMutation,
  useWithdrawStaffCustomerMutation,
} from "@/app/(banking)/staff/customers/[id]/_api";
import { staffMutationQueryKeys } from "@/app/(banking)/staff/mutations/_api";
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
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, transactionTypeLabel } from "@/lib/format";

const schema = z
  .object({
    type: z.enum(["deposit", "withdraw", "transfer"]),
    customer_id: z.string().optional(),
    to_customer_id: z.string().optional(),
    amount: z.string().min(1, "Nominal wajib diisi"),
    note: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    const amount = Number(value.amount);
    if (!Number.isFinite(amount) || amount < 10000) {
      ctx.addIssue({
        code: "custom",
        path: ["amount"],
        message: "Minimal transaksi Rp 10.000",
      });
    }
    if (value.type === "transfer" && !value.to_customer_id) {
      ctx.addIssue({
        code: "custom",
        path: ["to_customer_id"],
        message: "Tujuan transfer wajib diisi",
      });
    }
    if (value.customer_id === value.to_customer_id) {
      ctx.addIssue({
        code: "custom",
        path: ["to_customer_id"],
        message: "Tujuan transfer harus berbeda dari nasabah sumber",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

type TransactionScope = "customer" | "staff" | "admin";

export function TransactionDialog({
  label = "Transaksi",
  scope,
  customerId,
  showCustomerSelect = false,
  triggerVariant = "default",
}: {
  label?: string;
  scope: TransactionScope;
  customerId?: string;
  showCustomerSelect?: boolean;
  triggerVariant?: "default" | "outline" | "secondary" | "ghost";
}) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data: adminCustomerOptionsResponse } = useAdminCustomerOptionsQuery();
  const { data: staffCustomerOptionsResponse } = useStaffCustomerOptionsQuery();
  const { mutate: depositCustomer, isPending: depositingCustomer } =
    useDepositCustomerMutation();
  const { mutate: withdrawCustomer, isPending: withdrawingCustomer } =
    useWithdrawCustomerMutation();
  const { mutate: transferCustomer, isPending: transferringCustomer } =
    useTransferCustomerMutation();
  const { mutate: depositAdminCustomer, isPending: depositingAdmin } =
    useDepositAdminCustomerMutation();
  const { mutate: withdrawAdminCustomer, isPending: withdrawingAdmin } =
    useWithdrawAdminCustomerMutation();
  const { mutate: transferAdminCustomer, isPending: transferringAdmin } =
    useTransferAdminCustomerMutation();
  const { mutate: depositStaffCustomer, isPending: depositingStaff } =
    useDepositStaffCustomerMutation();
  const { mutate: withdrawStaffCustomer, isPending: withdrawingStaff } =
    useWithdrawStaffCustomerMutation();
  const { mutate: transferStaffCustomer, isPending: transferringStaff } =
    useTransferStaffCustomerMutation();
  const customers =
    scope === "admin"
      ? (adminCustomerOptionsResponse?.data ?? [])
      : scope === "staff"
        ? (staffCustomerOptionsResponse?.data ?? [])
        : [];
  const inferredCustomerId =
    customerId ?? (showCustomerSelect ? customers[0]?.id : undefined) ?? "";
  const isPending =
    depositingCustomer ||
    withdrawingCustomer ||
    transferringCustomer ||
    depositingAdmin ||
    withdrawingAdmin ||
    transferringAdmin ||
    depositingStaff ||
    withdrawingStaff ||
    transferringStaff;
  const values: FormValues = {
    type: "deposit",
    customer_id: inferredCustomerId,
    to_customer_id: "",
    amount: "100000",
    note: "",
  };
  const form = useForm<FormValues>({ resolver: zodResolver(schema), values });
  const type = useWatch({ control: form.control, name: "type" });
  const selectedCustomerId = useWatch({
    control: form.control,
    name: "customer_id",
  });

  function invalidateTransactionQueries() {
    if (scope === "customer") {
      queryClient.invalidateQueries({
        queryKey: customerMutationQueryKeys.list(),
      });
      return;
    }
    if (scope === "admin") {
      queryClient.invalidateQueries({
        queryKey: adminCustomerQueryKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: adminMutationQueryKeys.list(),
      });
      return;
    }
    queryClient.invalidateQueries({ queryKey: staffCustomerQueryKeys.list() });
    queryClient.invalidateQueries({ queryKey: staffMutationQueryKeys.list() });
  }

  function submit(submitted: FormValues) {
    const sourceCustomerId = customerId ?? submitted.customer_id ?? "";
    const amountPayload = {
      amount: submitted.amount,
      note: submitted.note || null,
    };
    const transferPayload = {
      ...amountPayload,
      to_customer_id: submitted.to_customer_id ?? "",
    };
    const handlers = {
      onSuccess: () => {
        toast.success("Transaksi berhasil diproses", {
          description: `${transactionTypeLabel(submitted.type)} ${formatCurrency(Number(submitted.amount) * 100)} berhasil disimpan.`,
        });
        invalidateTransactionQueries();
        setOpen(false);
      },
      onError: (error: Error) => {
        toast.error("Gagal memproses transaksi", {
          description: error.message,
        });
      },
    };

    if (scope === "customer") {
      if (submitted.type === "deposit") {
        depositCustomer(amountPayload, handlers);
        return;
      }
      if (submitted.type === "withdraw") {
        withdrawCustomer(amountPayload, handlers);
        return;
      }
      transferCustomer(transferPayload, handlers);
      return;
    }

    if (!sourceCustomerId) {
      toast.error("Nasabah sumber wajib dipilih");
      return;
    }

    if (scope === "admin") {
      if (submitted.type === "deposit") {
        depositAdminCustomer(
          { id: sourceCustomerId, payload: amountPayload },
          handlers,
        );
        return;
      }
      if (submitted.type === "withdraw") {
        withdrawAdminCustomer(
          { id: sourceCustomerId, payload: amountPayload },
          handlers,
        );
        return;
      }
      transferAdminCustomer(
        { id: sourceCustomerId, payload: transferPayload },
        handlers,
      );
      return;
    }

    if (submitted.type === "deposit") {
      depositStaffCustomer(
        { id: sourceCustomerId, payload: amountPayload },
        handlers,
      );
      return;
    }
    if (submitted.type === "withdraw") {
      withdrawStaffCustomer(
        { id: sourceCustomerId, payload: amountPayload },
        handlers,
      );
      return;
    }
    transferStaffCustomer(
      { id: sourceCustomerId, payload: transferPayload },
      handlers,
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" variant={triggerVariant} />}>
        {label}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transaksi perbankan</DialogTitle>
          <DialogDescription className="text-xs">
            Proses setor tunai, tarik tunai, atau transfer sesuai akses
            pengguna.
          </DialogDescription>
        </DialogHeader>
        <form
          id="transaction-dialog-form"
          className="grid gap-3"
          onSubmit={form.handleSubmit(submit)}
          noValidate
        >
          <FieldGroup className="gap-3">
            {showCustomerSelect ? (
              <Controller
                control={form.control}
                name="customer_id"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs">Nasabah sumber</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className="w-full text-xs"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Pilih nasabah" />
                      </SelectTrigger>
                      <SelectContent align="start">
                        {customers.map((customer) => (
                          <SelectItem
                            key={customer.id}
                            value={customer.id}
                            className="text-xs"
                          >
                            {customer.name}
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
            ) : null}

            <Controller
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs">Tipe</FieldLabel>
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
                      <SelectItem value="deposit" className="text-xs">
                        Setor tunai
                      </SelectItem>
                      <SelectItem value="withdraw" className="text-xs">
                        Tarik tunai
                      </SelectItem>
                      <SelectItem value="transfer" className="text-xs">
                        Transfer
                      </SelectItem>
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

            {type === "transfer" ? (
              <Controller
                control={form.control}
                name="to_customer_id"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs">Tujuan transfer</FieldLabel>
                    {scope === "customer" ? (
                      <Input
                        placeholder="Masukkan ID nasabah tujuan"
                        className="text-xs placeholder:text-xs"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                    ) : (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="w-full text-xs"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Pilih tujuan" />
                        </SelectTrigger>
                        <SelectContent align="start">
                          {customers
                            .filter(
                              (customer) =>
                                customer.id !==
                                (customerId ?? selectedCustomerId),
                            )
                            .map((customer) => (
                              <SelectItem
                                key={customer.id}
                                value={customer.id}
                                className="text-xs"
                              >
                                {customer.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                    {fieldState.invalid ? (
                      <FieldError
                        className="text-xs"
                        errors={[fieldState.error]}
                      />
                    ) : null}
                  </Field>
                )}
              />
            ) : null}

            <Controller
              control={form.control}
              name="amount"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="transaction-dialog-amount"
                    className="text-xs"
                  >
                    Nominal
                  </FieldLabel>
                  <Input
                    id="transaction-dialog-amount"
                    inputMode="numeric"
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

            <Controller
              control={form.control}
              name="note"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="transaction-dialog-note"
                    className="text-xs"
                  >
                    Catatan
                  </FieldLabel>
                  <Textarea
                    id="transaction-dialog-note"
                    placeholder="Opsional"
                    className="min-h-16 resize-none text-xs placeholder:text-xs"
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
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="transaction-dialog-form"
            size="sm"
            disabled={isPending}
          >
            {isPending ? "Memproses..." : "Simpan transaksi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
