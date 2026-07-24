"use client";

import { mutationColumns } from "@/components/banking-columns";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { useAdminMutationsQuery } from "@/app/(banking)/admin/mutations/_api";

import { useAdminDashboardQuery } from "../_api";
import { IncomeOutcomeChart } from "./income-outcome-chart";
import { OverviewCards } from "./overview-cards";

export function DashboardClient() {
  const {
    data: dashboardResponse,
    isLoading: dashboardLoading,
    isError: dashboardError,
  } = useAdminDashboardQuery();
  const {
    data: mutationResponse,
    isLoading: mutationLoading,
    isError: mutationError,
  } = useAdminMutationsQuery({ per_page: 5 });
  const dashboard = dashboardResponse?.data;
  const mutations = mutationResponse?.data.items ?? [];
  const emptyLabel = mutationLoading
    ? "Memuat aktivitas terbaru..."
    : mutationError
      ? "Gagal memuat aktivitas terbaru."
      : "Belum ada aktivitas terbaru.";

  return (
    <>
      <PageHeader
        title="Ringkasan Operasional"
        description="Pantau saldo portofolio, pergerakan transaksi, dan aktivitas perbankan terbaru dalam satu ruang kerja operasional."
      />
      <OverviewCards data={dashboard} />
      {dashboardError ? (
        <p className="text-xs text-destructive">
          Gagal memuat ringkasan operasional. Pastikan sesi Anda masih aktif.
        </p>
      ) : null}
      <div className="grid gap-3 xl:grid-cols-[1fr_0.9fr]">
        <DataTable
          title="Aktivitas Buku Besar Terbaru"
          description="Transaksi masuk dan keluar terbaru di seluruh rekening nasabah."
          data={mutations}
          columns={mutationColumns}
          emptyLabel={emptyLabel}
        />
        <IncomeOutcomeChart data={dashboardLoading ? [] : dashboard?.chart} />
      </div>
    </>
  );
}
