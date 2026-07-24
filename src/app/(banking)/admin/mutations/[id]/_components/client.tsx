"use client";

import { MutationDetail } from "@/components/mutation-detail";
import { PageHeader } from "@/components/page-header";

import { useAdminMutationDetailQuery } from "../_api";

export function AdminMutationDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useAdminMutationDetailQuery(id);
  const mutation = data?.data;

  return (
    <>
      <PageHeader
        title="Detail Entri Buku Besar"
        description="Periksa metadata transaksi, arah pergerakan, aktor, dan dampak saldo."
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
