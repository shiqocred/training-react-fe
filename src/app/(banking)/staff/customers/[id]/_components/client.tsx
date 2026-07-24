"use client";

import { CustomerDetail } from "@/components/customer-detail";
import { PageHeader } from "@/components/page-header";

import { useStaffCustomerDetailQuery } from "../_api";

export function StaffCustomerDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useStaffCustomerDetailQuery(id);
  const customer = data?.data;

  return (
    <>
      <PageHeader
        title="Profil Nasabah"
        description="Tinjau detail rekening nasabah dan riwayat transaksi berbantuan cabang."
      />
      {isLoading ? (
        <p className="text-xs text-muted-foreground">
          Memuat profil nasabah...
        </p>
      ) : isError || !customer ? (
        <p className="text-xs text-destructive">Gagal memuat profil nasabah.</p>
      ) : (
        <CustomerDetail
          customer={customer}
          mutations={customer.mutations}
          scope="staff"
        />
      )}
    </>
  );
}
