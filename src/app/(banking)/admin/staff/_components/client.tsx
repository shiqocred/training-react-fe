"use client";

import { staffColumns } from "@/components/banking-columns";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { StaffActionsMenu } from "@/components/staff-actions-menu";
import { StaffFormDialog } from "@/components/staff-form-dialog";
import type { StaffItem } from "@/types/banking";

import { useAdminStaffQuery } from "../_api";

export function AdminStaffClient() {
  const { data, isLoading, isError } = useAdminStaffQuery();
  const rows = data?.data.items ?? [];
  const emptyLabel = isLoading
    ? "Memuat data staff..."
    : isError
      ? "Gagal memuat data staff."
      : "Belum ada data staff.";
  const columns: DataTableColumn<StaffItem>[] = [
    ...staffColumns,
    {
      id: "actions",
      header: <span className="sr-only">Aksi</span>,
      className: "py-2 text-xs text-right",
      cell: (row) => <StaffActionsMenu staff={row} />,
    },
  ];

  return (
    <>
      <PageHeader
        title="Administrasi Staff"
        description="Kelola akses teller, profil staff, dan data pengguna operasional."
        actions={<StaffFormDialog mode="create" triggerLabel="Tambah staff" />}
      />
      <DataTable
        title="Direktori Staff"
        description="Staff operasional yang terdaftar untuk aktivitas perbankan cabang."
        data={rows}
        columns={columns}
        emptyLabel={emptyLabel}
      />
    </>
  );
}
