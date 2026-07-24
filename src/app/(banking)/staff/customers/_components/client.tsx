"use client";

import { customerColumns } from "@/components/banking-columns";
import { CustomerActionsMenu } from "@/components/customer-actions-menu";
import { CustomerFormDialog } from "@/components/customer-form-dialog";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { TransactionDialog } from "@/components/transaction-dialog";
import type { CustomerItem } from "@/types/banking";

import { useStaffCustomersQuery } from "../_api";

export function StaffCustomersClient() {
  const { data, isLoading, isError } = useStaffCustomersQuery();
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
          detailHref={`/staff/customers/${row.id}`}
          scope="staff"
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Layanan Nasabah"
        description="Bantu nasabah meninjau rekening dan memproses transaksi di teller."
        actions={
          <>
            <TransactionDialog
              label="Transaksi baru"
              scope="staff"
              showCustomerSelect
              triggerVariant="outline"
            />
            <CustomerFormDialog
              mode="create"
              scope="staff"
              triggerLabel="Tambah nasabah"
            />
          </>
        }
      />
      <DataTable
        title="Direktori Nasabah"
        description="Cari nasabah dan jalankan operasi perbankan berbantuan teller."
        data={rows}
        columns={columns}
        emptyLabel={emptyLabel}
      />
    </>
  );
}
