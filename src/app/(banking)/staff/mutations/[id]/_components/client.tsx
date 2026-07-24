"use client";

import { MutationDetail } from "@/components/mutation-detail";
import { PageHeader } from "@/components/page-header";

import { useStaffMutationDetailQuery } from "../_api";

export function StaffMutationDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useStaffMutationDetailQuery(id);
  const mutation = data?.data;

  return (
    <>
      <PageHeader
        title="Detail Entri Buku Besar"
        description="Tinjau konteks transaksi, informasi aktor, dan pergerakan saldo."
      />
      {isLoading ? (
        <p className="text-xs text-muted-foreground">
          Memuat detail transaksi...
        </p>
      ) : isError || !mutation ? (
        <p className="text-xs text-destructive">
          Gagal memuat detail transaksi.
        </p>
      ) : (
        <MutationDetail mutation={mutation} />
      )}
    </>
  );
}
