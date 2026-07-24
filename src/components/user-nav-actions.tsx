"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, UserRound } from "lucide-react";
import { toast } from "sonner";

import { useLogoutMutation } from "@/app/(banking)/_api";
import { useMeQuery } from "@/app/(banking)/settings/_api";
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
import { removeAccessTokenCookie } from "@/lib/auth-cookies";
import type { MeData } from "@/types/banking";

const roleLabel = {
  admin: "Admin",
  staff: "Staff",
  customer: "Nasabah",
};

export function UserNavActions({
  user,
  token,
  onLogout,
}: {
  user?: MeData;
  token?: string;
  onLogout?: () => void | Promise<void>;
}) {
  const router = useRouter();
  const { data } = useMeQuery(token);
  const currentUser = user ?? data?.data;
  const { mutate: logoutMutate, isPending: isLoggingOut } =
    useLogoutMutation(token);

  function handleLogout() {
    logoutMutate(undefined, {
      onSettled: () => {
        removeAccessTokenCookie();
        toast.success("Berhasil keluar", {
          description: "Sesi Anda telah diakhiri.",
        });
        void Promise.resolve(onLogout?.()).finally(() => {
          router.push("/auth/login");
        });
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        <UserRound className="size-3.5" />
        <span className="max-w-28 truncate text-xs">
          {currentUser?.name ?? "Akun"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="grid gap-1">
            <span className="truncate text-xs font-medium">
              {currentUser?.name ?? "Pengguna"}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {currentUser
                ? `${currentUser.email} · ${roleLabel[currentUser.role]}`
                : "Memuat profil..."}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            render={<Link href="/settings" />}
            className="text-xs"
          >
            <Settings className="size-3.5" />
            Pengaturan akun
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="text-xs"
            disabled={isLoggingOut}
            onClick={handleLogout}
          >
            <LogOut className="size-3.5" />
            {isLoggingOut ? "Keluar..." : "Keluar"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
