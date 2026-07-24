"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import type { DataTableColumn } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  formatCurrency,
  formatDateTime,
  transactionTypeLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AllMutationItem, CustomerItem, StaffItem } from "@/types/banking";

function typeBadgeClass(type: AllMutationItem["type"]) {
  return cn(
    "border text-xs",
    type === "deposit" &&
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    type === "withdraw" &&
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    type === "transfer" &&
      "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  );
}

export const customerColumns: DataTableColumn<CustomerItem>[] = [
  {
    id: "name",
    header: "Nasabah",
    cell: (row) => (
      <div className="min-w-40 leading-relaxed">
        <div className="font-semibold text-foreground">{row.name}</div>
        <div className="text-xs text-muted-foreground">{row.email}</div>
      </div>
    ),
  },
  {
    id: "account_number",
    header: "No. Rekening",
    cell: (row) => (
      <span className="font-mono text-xs tracking-tight">
        {row.account_number}
      </span>
    ),
  },
  {
    id: "balance",
    header: "Saldo",
    cell: (row) => (
      <span className="font-semibold tabular-nums">
        {formatCurrency(row.balance)}
      </span>
    ),
  },
  {
    id: "created_at",
    header: "Dibuat",
    cell: (row) => (
      <span className="text-muted-foreground">
        {formatDateTime(row.created_at)}
      </span>
    ),
  },
];

export const mutationColumns: DataTableColumn<AllMutationItem>[] = [
  {
    id: "customer_name",
    header: "Nasabah",
    cell: (row) => (
      <div className="leading-relaxed">
        <div className="font-semibold text-foreground">{row.customer_name}</div>
        <div className="text-xs text-muted-foreground">
          {row.actor_name} · {row.actor_role}
        </div>
      </div>
    ),
  },
  {
    id: "type",
    header: "Tipe",
    cell: (row) => (
      <Badge className={typeBadgeClass(row.type)}>
        {transactionTypeLabel(row.type)}
      </Badge>
    ),
  },
  {
    id: "direction",
    header: "Arah",
    cell: (row) =>
      row.direction === "in" ? (
        <Badge className="gap-1 border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-300">
          <ArrowDownLeft className="size-3" /> Masuk
        </Badge>
      ) : (
        <Badge className="gap-1 border border-rose-500/20 bg-rose-500/10 text-xs text-rose-700 dark:text-rose-300">
          <ArrowUpRight className="size-3" /> Keluar
        </Badge>
      ),
  },
  {
    id: "amount",
    header: "Nominal",
    cell: (row) => (
      <span className="font-semibold text-foreground tabular-nums">
        {formatCurrency(row.amount)}
      </span>
    ),
  },
  {
    id: "balance_after",
    header: "Saldo Akhir",
    cell: (row) => (
      <span className="tabular-nums">{formatCurrency(row.balance_after)}</span>
    ),
  },
  {
    id: "created_at",
    header: "Waktu",
    cell: (row) => (
      <span className="text-muted-foreground">
        {formatDateTime(row.created_at)}
      </span>
    ),
  },
];

export const staffColumns: DataTableColumn<StaffItem>[] = [
  {
    id: "name",
    header: "Staff",
    cell: (row) => (
      <div className="leading-relaxed">
        <div className="font-semibold text-foreground">{row.name}</div>
        <div className="text-xs text-muted-foreground">{row.email}</div>
      </div>
    ),
  },
  {
    id: "role",
    header: "Role",
    cell: (row) => (
      <Badge className="border border-violet-500/20 bg-violet-500/10 text-xs text-violet-700 dark:text-violet-300">
        {row.role}
      </Badge>
    ),
  },
  {
    id: "created_at",
    header: "Dibuat",
    cell: (row) => (
      <span className="text-muted-foreground">
        {formatDateTime(row.created_at)}
      </span>
    ),
  },
];
