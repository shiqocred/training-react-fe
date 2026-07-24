"use client";

import { MutationDetail } from "@/components/mutation-detail";
import { PageHeader } from "@/components/page-header";
import type { AllMutationItem } from "@/types/banking";

import { useCustomerMutationDetailQuery } from "../_api";

export function CustomerMutationDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useCustomerMutationDetailQuery(id);
  const mutation = data?.data
    ? ({
        ...data.data,
        customer_id: "",
        customer_name: "Rekening saya",
      } satisfies AllMutationItem)
    : undefined;

  return (
    <>
      <PageHeader
        title="Detail Transaksi"
        description="Tinjau satu pergerakan buku besar nasabah beserta dampaknya pada saldo rekening."
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
