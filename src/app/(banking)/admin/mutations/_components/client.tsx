"use client";

import { mutationColumns } from "@/components/banking-columns";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { MutationActionsMenu } from "@/components/mutation-actions-menu";
import { PageHeader } from "@/components/page-header";
import { TransactionDialog } from "@/components/transaction-dialog";
import type { AllMutationItem } from "@/types/banking";

import { useAdminMutationsQuery } from "../_api";

export function AdminMutationsClient() {
  const { data, isLoading, isError } = useAdminMutationsQuery();
  const rows = data?.data.items ?? [];
  const emptyLabel = isLoading
    ? "Memuat data buku besar..."
    : isError
      ? "Gagal memuat data buku besar."
      : "Belum ada entri buku besar.";
  const columns: DataTableColumn<AllMutationItem>[] = [
    ...mutationColumns,
    {
      id: "actions",
      header: <span className="sr-only">Aksi</span>,
      className: "py-2 text-xs text-right",
      cell: (row) => (
        <MutationActionsMenu detailHref={`/admin/mutations/${row.id}`} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Pemantauan Buku Besar"
        description="Pantau seluruh pergerakan rekening nasabah dan buat transaksi administratif."
        actions={
          <TransactionDialog
            label="Transaksi baru"
            scope="admin"
            showCustomerSelect
          />
        }
      />
      <DataTable
        title="Semua Entri Buku Besar"
        description="Riwayat transaksi lengkap dengan aktor, arah transaksi, dan referensi saldo."
        data={rows}
        columns={columns}
        emptyLabel={emptyLabel}
      />
    </>
  );
}
