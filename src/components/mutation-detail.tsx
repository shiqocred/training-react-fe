import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarClock,
  ReceiptText,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatCurrency,
  formatDateTime,
  transactionTypeLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AllMutationItem } from "@/types/banking";

function mutationTypeClass(type: AllMutationItem["type"]) {
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

export function MutationDetail({ mutation }: { mutation: AllMutationItem }) {
  const isIncome = mutation.direction === "in";

  return (
    <Card className="shadow-sm" size="sm">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-sm! font-semibold">
              Entri Buku Besar
            </CardTitle>
            <CardDescription className="font-mono text-xs leading-5">
              {mutation.id}
            </CardDescription>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Badge className={mutationTypeClass(mutation.type)}>
              {transactionTypeLabel(mutation.type)}
            </Badge>
            <Badge
              className={cn(
                "gap-1 border text-xs",
                isIncome
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
              )}
            >
              {isIncome ? (
                <ArrowDownLeft className="size-3" />
              ) : (
                <ArrowUpRight className="size-3" />
              )}
              {isIncome ? "Masuk" : "Keluar"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Nasabah
          </p>
          <p className="font-semibold leading-5 text-foreground">
            {mutation.customer_name}
          </p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Nominal
          </p>
          <p className="font-bold leading-5 text-foreground tabular-nums">
            {formatCurrency(mutation.amount)}
          </p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <CalendarClock className="size-3.5" /> Diposting pada
          </div>
          <p className="leading-5 text-muted-foreground">
            {formatDateTime(mutation.created_at)}
          </p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Saldo Sebelum
          </p>
          <p className="font-semibold leading-5 tabular-nums">
            {formatCurrency(mutation.balance_before)}
          </p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Saldo Sesudah
          </p>
          <p className="font-semibold leading-5 tabular-nums">
            {formatCurrency(mutation.balance_after)}
          </p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <UserRound className="size-3.5" /> Aktor
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold text-foreground truncate">
              {mutation.actor_name}
            </p>
            <Badge className="border border-violet-500/20 bg-violet-500/10 text-xs text-violet-700 dark:text-violet-300">
              {mutation.actor_role}
            </Badge>
          </div>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3 md:col-span-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <ReceiptText className="size-3.5" /> Referensi & Catatan
          </div>
          <p className="font-mono text-xs leading-5">
            {mutation.reference_id ?? "-"}
          </p>
          <p className="mt-2 leading-5 text-muted-foreground">
            {mutation.note ?? "Tidak ada catatan"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
