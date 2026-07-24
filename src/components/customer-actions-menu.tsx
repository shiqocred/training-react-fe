"use client";

import * as React from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { adminCustomerQueryKeys } from "@/app/(banking)/admin/customers/_api";
import { useDeleteAdminCustomerMutation } from "@/app/(banking)/admin/customers/[id]/_api";
import { staffCustomerQueryKeys } from "@/app/(banking)/staff/customers/_api";
import { useDeleteStaffCustomerMutation } from "@/app/(banking)/staff/customers/[id]/_api";
import { CustomerFormDialog } from "@/components/customer-form-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CustomerItem } from "@/types/banking";

export function CustomerActionsMenu({
  customer,
  detailHref,
  scope,
}: {
  customer: CustomerItem;
  detailHref: string;
  scope: "admin" | "staff";
}) {
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteAdminCustomer, isPending: deletingAdmin } =
    useDeleteAdminCustomerMutation();
  const { mutate: deleteStaffCustomer, isPending: deletingStaff } =
    useDeleteStaffCustomerMutation();
  const isPending = deletingAdmin || deletingStaff;

  function handleDelete() {
    const handlers = {
      onSuccess: () => {
        toast.success("Nasabah berhasil dihapus");
        queryClient.invalidateQueries({
          queryKey:
            scope === "admin"
              ? adminCustomerQueryKeys.list()
              : staffCustomerQueryKeys.list(),
        });
        queryClient.invalidateQueries({
          queryKey:
            scope === "admin"
              ? adminCustomerQueryKeys.options()
              : staffCustomerQueryKeys.options(),
        });
      },
      onError: (error: Error) => {
        toast.error("Gagal menghapus nasabah", { description: error.message });
      },
    };

    if (scope === "admin") {
      deleteAdminCustomer(customer.id, handlers);
      return;
    }
    deleteStaffCustomer(customer.id, handlers);
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
          <MoreHorizontal className="size-3.5" />
          <span className="sr-only">Buka aksi</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              render={<Link href={detailHref} />}
              className="text-xs"
            >
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              onClick={() => setUpdateOpen(true)}
            >
              Ubah
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="text-xs"
              disabled={isPending}
              onClick={handleDelete}
            >
              {isPending ? "Menghapus..." : "Hapus"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomerFormDialog
        mode="update"
        scope={scope}
        customer={customer}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />
    </div>
  );
}
