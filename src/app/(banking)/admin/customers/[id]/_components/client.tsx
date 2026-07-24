"use client";

import { CustomerDetail } from "@/components/customer-detail";
import { PageHeader } from "@/components/page-header";

import { useAdminCustomerDetailQuery } from "../_api";

export function AdminCustomerDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useAdminCustomerDetailQuery(id);
  const customer = data?.data;

  return (
    <>
      <PageHeader
        title="Profil Nasabah"
        description="Tinjau identitas nasabah, posisi rekening, dan aktivitas buku besar terkait."
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
          scope="admin"
        />
      )}
    </>
  );
}
