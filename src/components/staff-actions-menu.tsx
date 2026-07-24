"use client";

import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import {
  adminStaffQueryKeys,
  useDeleteAdminStaffMutation,
} from "@/app/(banking)/admin/staff/_api";
import { StaffFormDialog } from "@/components/staff-form-dialog";
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
import type { StaffItem } from "@/types/banking";

export function StaffActionsMenu({ staff }: { staff: StaffItem }) {
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteStaff, isPending } = useDeleteAdminStaffMutation();

  function handleDelete() {
    deleteStaff(staff.id, {
      onSuccess: () => {
        toast.success("Staff berhasil dihapus");
        queryClient.invalidateQueries({ queryKey: adminStaffQueryKeys.list() });
      },
      onError: (error: Error) => {
        toast.error("Gagal menghapus staff", { description: error.message });
      },
    });
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
      <StaffFormDialog
        mode="update"
        staff={staff}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />
    </div>
  );
}
