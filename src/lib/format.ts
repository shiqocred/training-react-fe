import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

import type { Pagination, TransactionType } from "@/types/banking";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function formatDateTime(value: string) {
  const parsed = parse(value, "yyyy-MM-dd HH:mm:ss", new Date());

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return format(parsed, "dd MMM yyyy, HH:mm", { locale: id });
}

export function createPagination(
  page: number,
  perPage: number,
  total: number,
): Pagination {
  return {
    current_page: page,
    per_page: perPage,
    from: total === 0 ? 0 : (page - 1) * perPage + 1,
    total,
    last_page: Math.max(1, Math.ceil(total / perPage)),
  };
}

export function transactionTypeLabel(type: TransactionType) {
  const labels: Record<TransactionType, string> = {
    deposit: "Setor",
    withdraw: "Tarik",
    transfer: "Transfer",
  };

  return labels[type];
}
