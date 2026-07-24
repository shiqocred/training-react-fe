"use client";

import { mutationColumns } from "@/components/banking-columns";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { MutationActionsMenu } from "@/components/mutation-actions-menu";
import { PageHeader } from "@/components/page-header";
import { TransactionDialog } from "@/components/transaction-dialog";
import type { AllMutationItem } from "@/types/banking";

import { useCustomerMutationsQuery } from "../_api";

export function CustomerMutationsClient() {
  const { data, isLoading, isError } = useCustomerMutationsQuery();
  const rows: AllMutationItem[] = (data?.data.items ?? []).map((item) => ({
    ...item,
    customer_id: "",
    customer_name: "Rekening saya",
  }));
  const emptyLabel = isLoading
    ? "Memuat aktivitas rekening..."
    : isError
      ? "Gagal memuat aktivitas rekening."
      : "Belum ada aktivitas rekening.";
  const columns: DataTableColumn<AllMutationItem>[] = [
    ...mutationColumns,
    {
      id: "actions",
      header: <span className="sr-only">Aksi</span>,
      className: "py-2 text-xs text-right",
      cell: (row) => (
        <MutationActionsMenu detailHref={`/mutations/${row.id}`} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Transaksi Saya"
        description="Tinjau aktivitas rekening Anda dan ajukan transaksi setor tunai, tarik tunai, atau transfer."
        actions={<TransactionDialog label="Transaksi baru" scope="customer" />}
      />
      <DataTable
        title="Aktivitas Rekening"
        description="Riwayat buku besar pribadi berisi jenis transaksi, arah transaksi, dan pembaruan saldo."
        data={rows}
        columns={columns}
        emptyLabel={emptyLabel}
      />
    </>
  );
}
