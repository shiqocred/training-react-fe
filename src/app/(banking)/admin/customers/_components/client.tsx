"use client";

import { customerColumns } from "@/components/banking-columns";
import { CustomerActionsMenu } from "@/components/customer-actions-menu";
import { CustomerFormDialog } from "@/components/customer-form-dialog";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { TransactionDialog } from "@/components/transaction-dialog";
import type { CustomerItem } from "@/types/banking";

import { useAdminCustomersQuery } from "../_api";

export function AdminCustomersClient() {
  const { data, isLoading, isError } = useAdminCustomersQuery();
  const rows = data?.data.items ?? [];
  const emptyLabel = isLoading
    ? "Memuat data nasabah..."
    : isError
      ? "Gagal memuat data nasabah."
      : "Belum ada data nasabah.";
  const columns: DataTableColumn<CustomerItem>[] = [
    ...customerColumns,
    {
      id: "actions",
      header: <span className="sr-only">Aksi</span>,
      className: "py-2 text-xs text-right",
      cell: (row) => (
        <CustomerActionsMenu
          customer={row}
          detailHref={`/admin/customers/${row.id}`}
          scope="admin"
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Manajemen Nasabah"
        description="Kelola akun nasabah, tinjau saldo, dan mulai transaksi berbantuan."
        actions={
          <>
            <TransactionDialog
              label="Transaksi baru"
              scope="admin"
              showCustomerSelect
              triggerVariant="outline"
            />
            <CustomerFormDialog
              mode="create"
              scope="admin"
              triggerLabel="Tambah nasabah"
            />
          </>
        }
      />
      <DataTable
        title="Direktori Nasabah"
        description="Cari dan kelola nasabah perbankan yang terdaftar."
        data={rows}
        columns={columns}
        emptyLabel={emptyLabel}
      />
    </>
  );
}
