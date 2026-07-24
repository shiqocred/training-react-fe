"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const authItems = [
  {
    href: "/auth/login",
    label: "Masuk",
    icon: LogIn,
    variant: "outline" as const,
  },
  {
    href: "/auth/register",
    label: "Daftar",
    icon: UserPlus,
    variant: "default" as const,
  },
];

export function AuthNavActions() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {authItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              buttonVariants({ variant: item.variant, size: "sm" }),
              "h-7 gap-1.5 text-xs",
              active &&
                item.variant === "outline" &&
                "border-primary/50 bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
              active &&
                item.variant === "default" &&
                "ring-2 ring-primary/25 ring-offset-1 ring-offset-background",
            )}
          >
            <Icon className="size-3.5" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
