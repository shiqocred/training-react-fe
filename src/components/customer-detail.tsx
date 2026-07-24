import { CalendarClock, CreditCard, Mail, UserRound } from "lucide-react";

import { mutationColumns } from "@/components/banking-columns";
import { DataTable } from "@/components/data-table";
import { TransactionDialog } from "@/components/transaction-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { AllMutationItem, CustomerItem } from "@/types/banking";

const statusLabel: Record<CustomerItem["status"], string> = {
  active: "Aktif",
  inactive: "Nonaktif",
  blocked: "Diblokir",
};

const statusClass: Record<CustomerItem["status"], string> = {
  active:
    "border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-300",
  inactive:
    "border border-amber-500/20 bg-amber-500/10 text-xs text-amber-700 dark:text-amber-300",
  blocked:
    "border border-rose-500/20 bg-rose-500/10 text-xs text-rose-700 dark:text-rose-300",
};

export function CustomerDetail({
  customer,
  mutations = [],
  scope,
}: {
  customer: CustomerItem;
  mutations?: AllMutationItem[];
  scope: "admin" | "staff";
}) {
  return (
    <div className="grid gap-3">
      <Card className="shadow-sm" size="sm">
        <CardHeader className="border-b">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
            <div className="space-y-1">
              <CardTitle className="text-sm font-semibold">
                Profil Nasabah
              </CardTitle>
              <CardDescription className="font-mono text-xs leading-5">
                {customer.id}
              </CardDescription>
            </div>
            <TransactionDialog
              label="Transaksi baru"
              customerId={customer.id}
              scope={scope}
              triggerVariant="outline"
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border bg-muted/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <UserRound className="size-3.5" /> Nama
            </div>
            <p className="font-semibold leading-5 text-foreground">
              {customer.name}
            </p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Mail className="size-3.5" /> Email
            </div>
            <p className="font-medium leading-5 text-foreground">
              {customer.email}
            </p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <CreditCard className="size-3.5" /> Rekening
            </div>
            <p className="font-mono text-xs leading-5">
              {customer.account_number}
            </p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <CalendarClock className="size-3.5" /> Dibuat
            </div>
            <p className="leading-5 text-muted-foreground">
              {formatDateTime(customer.created_at)}
            </p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-3 md:col-span-4">
            <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
              <span>Saldo Tersedia</span>
              <Badge className={statusClass[customer.status]}>
                {statusLabel[customer.status]}
              </Badge>
            </div>
            <p className="font-semibold leading-5 text-foreground tabular-nums">
              {formatCurrency(customer.balance)}
            </p>
          </div>
        </CardContent>
      </Card>

      <DataTable
        title="Buku Besar Nasabah"
        description="Seluruh pergerakan rekening yang terkait dengan profil nasabah ini."
        data={mutations}
        columns={mutationColumns}
        emptyLabel="Belum ada mutasi untuk nasabah ini."
      />
    </div>
  );
}
