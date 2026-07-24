"use client";

import { mutationColumns } from "@/components/banking-columns";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { MutationActionsMenu } from "@/components/mutation-actions-menu";
import { PageHeader } from "@/components/page-header";
import { TransactionDialog } from "@/components/transaction-dialog";
import type { AllMutationItem } from "@/types/banking";

import { useStaffMutationsQuery } from "../_api";

export function StaffMutationsClient() {
  const { data, isLoading, isError } = useStaffMutationsQuery();
  const rows = data?.data.items ?? [];
  const emptyLabel = isLoading
    ? "Memuat data transaksi cabang..."
    : isError
      ? "Gagal memuat data transaksi cabang."
      : "Belum ada transaksi cabang.";
  const columns: DataTableColumn<AllMutationItem>[] = [
    ...mutationColumns,
    {
      id: "actions",
      header: <span className="sr-only">Aksi</span>,
      className: "py-2 text-xs text-right",
      cell: (row) => (
        <MutationActionsMenu detailHref={`/staff/mutations/${row.id}`} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Aktivitas Buku Besar Cabang"
        description="Pantau transaksi nasabah yang diproses di aktivitas operasional cabang."
        actions={
          <TransactionDialog
            label="Transaksi baru"
            scope="staff"
            showCustomerSelect
          />
        }
      />
      <DataTable
        title="Semua Transaksi Cabang"
        description="Tampilan buku besar terkonsolidasi dengan aktor, arah transaksi, dan jenis transaksi."
        data={rows}
        columns={columns}
        emptyLabel={emptyLabel}
      />
    </>
  );
}
