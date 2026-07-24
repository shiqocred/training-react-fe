"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark } from "lucide-react";

import { useMeQuery } from "@/app/(banking)/settings/_api";
import { UserNavActions } from "@/components/user-nav-actions";
import type { AuthRole } from "@/lib/auth-routes";
import { cn } from "@/lib/utils";

const navItems: {
  href: string;
  label: string;
  roles: AuthRole[];
}[] = [
  { href: "/mutations", label: "Mutasi", roles: ["customer"] },
  {
    href: "/settings",
    label: "Pengaturan",
    roles: ["customer", "staff", "admin"],
  },
  { href: "/staff/customers", label: "Nasabah", roles: ["staff"] },
  { href: "/staff/mutations", label: "Mutasi", roles: ["staff"] },
  { href: "/admin/customers", label: "Nasabah", roles: ["admin"] },
  { href: "/admin/mutations", label: "Mutasi", roles: ["admin"] },
  { href: "/admin/staff", label: "Staff", roles: ["admin"] },
];

const isNavActive = (pathname: string, href: string) =>
  href === "/" ? pathname === href : pathname.startsWith(href);

export function AppShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const { data } = useMeQuery();
  const role = data?.data.role;
  const visibleNavItems = role
    ? navItems.filter((item) => item.roles.includes(role))
    : [];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,var(--muted),transparent_34%),linear-gradient(to_bottom,var(--background),var(--muted)/0.15)] text-xs text-foreground">
      <nav className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Landmark className="size-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold leading-none">
                    Fiber Banking
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Konsol Operasional
                  </span>
                </span>
              </Link>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {visibleNavItems.map((item) => {
                  const active = isNavActive(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "shrink-0 rounded-lg px-2.5 py-1.5 text-xs transition-colors hover:bg-muted hover:text-foreground",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <UserNavActions />
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "mx-auto w-full max-w-7xl flex flex-col gap-4 p-3 md:p-4",
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
}
